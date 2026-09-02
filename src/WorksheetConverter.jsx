import React, { useState, useRef, useCallback } from "react";
import {
  C, ITEM_TYPES, TYPE_MAP,
  readAsText, extractTextFromDocx, splitFromPDF,
  splitByNumbering, splitWithAI,
  convertAll, convertOne,
  ItemVisual, renderMathText,
} from "./shared";

const SAMPLE = `1. Solve for x: 3x - 7 = 20
2. Simplify: (2x^3)(5x^2)
3. A cyclist travels 3.5 kilometers. How many meters is that?
4. Graph the line y = 2x - 3.
5. Find f(1) and f(2) if f(x) = x^2 - 1.`;

export default function WorksheetConverter() {
  const [stage, setStage] = useState("input");
  const [rawText, setRawText] = useState("");
  const [pdfFile, setPdfFile] = useState(null); // { name }
  const [pdfBuffer, setPdfBuffer] = useState(null); // File object, read lazily on convert
  const [questions, setQuestions] = useState([]);
  const [busy, setBusy] = useState(false);
  const [busyLabel, setBusyLabel] = useState("");
  const [error, setError] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const fileRef = useRef(null);
  const printRef = useRef(null);

  const loadSample = () => {
    setRawText(SAMPLE);
    setPdfFile(null);
    setPdfBuffer(null);
  };

  const clearFile = () => {
    setPdfFile(null);
    setPdfBuffer(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setError("");
    const name = file.name.toLowerCase();
    try {
      if (name.endsWith(".pdf")) {
        setPdfFile({ name: file.name });
        setPdfBuffer(file);
        setRawText("");
      } else if (name.endsWith(".docx")) {
        setBusy(true);
        setBusyLabel("Reading " + file.name + "...");
        const text = await extractTextFromDocx(file);
        setRawText(text);
        setPdfFile(null);
        setPdfBuffer(null);
      } else {
        const text = await readAsText(file);
        setRawText(text);
        setPdfFile(null);
        setPdfBuffer(null);
      }
    } catch (err) {
      setError(err.message || "Could not read that file.");
    } finally {
      setBusy(false);
      setBusyLabel("");
    }
  };

  const startConversion = useCallback(async () => {
    setError("");
    if (!rawText.trim() && !pdfBuffer) {
      setError("Paste, or upload a worksheet first.");
      return;
    }
    setBusy(true);
    try {
      let probs;
      if (pdfBuffer) {
        setBusyLabel("Reading the PDF and splitting it into problems...");
        probs = await splitFromPDF(pdfBuffer);
      } else {
        setBusyLabel("Splitting the worksheet into problems...");
        probs = splitByNumbering(rawText);
        if (!probs) probs = await splitWithAI(rawText);
      }
      if (!probs.length) throw new Error("No problems were found.");

      setBusyLabel(`Analyzing ${probs.length} problem${probs.length > 1 ? "s" : ""} and recommending CAASPP formats...`);
      const groups = await convertAll(probs);

      // Safety net: if the model left any group unconverted, convert it on its own now.
      for (const g of groups) {
        if (!g.recommended_type) {
          const joined = g.source_indices.map((i) => probs[i]).join("\n");
          const r = await convertOne(joined, "equation_numeric");
          g.recommended_type = r.recommended_type;
          g.rationale = r.rationale;
          g.stem = r.stem;
          g.data = r.data;
        }
      }

      const merged = groups.map((g, i) => ({
        id: i,
        original: g.source_indices.map((idx) => probs[idx]).join("\n"),
        type: g.recommended_type,
        rationale: g.rationale || "",
        stem: g.stem || "",
        data: g.data || {},
        feedback: "",
      }));
      setQuestions(merged);
      setStage("review");
    } catch (e) {
      setError(e.message || "Something went wrong converting the worksheet.");
    } finally {
      setBusy(false);
      setBusyLabel("");
    }
  }, [rawText, pdfBuffer]);

  const regenerate = useCallback(async (id, newType, feedback) => {
    setQuestions((qs) => qs.map((q) => (q.id === id ? { ...q, loading: true } : q)));
    try {
      const q = questions.find((q) => q.id === id);
      const r = await convertOne(q.original, newType, feedback);
      setQuestions((qs) =>
        qs.map((q) =>
          q.id === id
            ? { ...q, type: r.recommended_type, rationale: r.rationale || "", stem: r.stem || q.original, data: r.data || {}, loading: false }
            : q
        )
      );
    } catch (e) {
      setError(e.message || "Could not regenerate that problem.");
      setQuestions((qs) => qs.map((q) => (q.id === id ? { ...q, loading: false } : q)));
    }
  }, [questions]);

  const buildExportHTML = () => {
    const node = printRef.current;
    if (!node) return null;
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>CAASPP Practice Worksheet</title>
<style>
  body { font-family: Calibri, 'Segoe UI', system-ui, sans-serif; color: ${C.ink}; padding: 28px; max-width: 900px; margin: 0 auto; }
  table { border-collapse: collapse; }
  h2 { font-family: Georgia, serif; color: ${C.navy}; }
  @media print {
    .page-break { page-break-before: always; }
  }
</style>
</head><body>${node.innerHTML}</body></html>`;
  };

  const setFeedback = useCallback((id, text) => {
    setQuestions((qs) => qs.map((q) => (q.id === id ? { ...q, feedback: text } : q)));
  }, []);

  const doPrint = () => {
    setError("");
    try {
      window.print();
    } catch (e) {
      setError("This environment doesn't allow triggering print automatically. Use your browser's own Print command (Ctrl+P or Cmd+P) instead, it will use the same worksheet layout shown below.");
    }
  };

  const downloadWord = () => {
    setError("");
    try {
      const html = buildExportHTML();
      if (!html) return;
      const dataUri = "data:application/msword;charset=utf-8," + encodeURIComponent(html);
      const a = document.createElement("a");
      a.href = dataUri;
      a.download = "CAASPPified_Worksheet.doc";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      setError("Could not download a Word file in this environment. Use Print and choose Save as PDF instead, or select and copy the worksheet text below.");
    }
  };

  const startOver = () => {
    setStage("input");
    setRawText("");
    setPdfFile(null);
    setPdfBuffer(null);
    setQuestions([]);
    setError("");
  };

  return (
    <div style={{ fontFamily: "Calibri, 'Segoe UI', system-ui, sans-serif", color: C.ink, maxWidth: 980, margin: "0 auto", padding: "0 16px 60px" }}>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-area { display: block !important; }
        }
        .print-area { display: none; }
        button:disabled { opacity: 0.55; cursor: not-allowed; }
        select, textarea, input[type=text] { font-family: inherit; }
      `}</style>

      {/* Header */}
      <div className="no-print" style={{ background: C.navy, color: C.white, padding: "22px 24px", borderRadius: 12, margin: "20px 0" }}>
        <div style={{ fontSize: 12, letterSpacing: 1, fontWeight: 700, color: "#9FC3D9" }}>CAASPP DEEP DIVE TOOLKIT</div>
        <div style={{ fontSize: 26, fontWeight: 700, fontFamily: "Georgia, 'Cambria', serif", marginTop: 4 }}>Worksheet CAASPPify</div>
        <div style={{ fontSize: 14, color: "#CADCFC", marginTop: 4 }}>
          Paste a worksheet, get each problem matched to a CAASPP item type, review or change the format, then export.
        </div>
      </div>

      {/* Stepper */}
      <div className="no-print" style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {["1. Input", "2. Review & customize", "3. Preview & export"].map((label, i) => {
          const active = (stage === "input" && i === 0) || (stage === "review" && i === 1) || (stage === "export" && i === 2);
          return (
            <div
              key={label}
              style={{
                flex: 1,
                textAlign: "center",
                padding: "8px 6px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 700,
                background: active ? C.teal : C.lightbg,
                color: active ? C.white : C.muted,
              }}
            >
              {label}
            </div>
          );
        })}
      </div>

      {error && (
        <div className="no-print" style={{ background: "#FDEEEE", border: "1px solid #F0B8B8", color: "#8A3B3B", padding: "10px 14px", borderRadius: 8, marginBottom: 16, fontSize: 14 }}>
          {error}
        </div>
      )}

      {/* Stage: Input */}
      {stage === "input" && (
        <div className="no-print">
          <label style={{ fontWeight: 700, fontSize: 14, color: C.navy, display: "block", marginBottom: 6 }}>
            Paste your worksheet problems
          </label>
          <textarea
            value={rawText}
            onChange={(e) => {
              setRawText(e.target.value);
              if (pdfFile) clearFile();
            }}
            placeholder={pdfFile ? "A PDF is loaded below. Clear it to paste text instead." : "1. Solve for x: ...\n2. ...\n3. ..."}
            rows={12}
            disabled={!!pdfFile}
            style={{ width: "100%", padding: 14, borderRadius: 10, border: `1.5px solid ${C.border}`, fontSize: 15, resize: "vertical", boxSizing: "border-box", background: pdfFile ? C.lightbg : C.white }}
          />

          {pdfFile && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10, padding: "8px 14px", borderRadius: 8, background: "#EAF4F1", border: `1px solid ${C.mint}`, fontSize: 13.5 }}>
              <span style={{ fontWeight: 700, color: C.navy }}>PDF loaded:</span>
              <span style={{ color: C.ink }}>{pdfFile.name}</span>
              <button onClick={clearFile} style={{ marginLeft: "auto", border: "none", background: "transparent", color: C.teal, fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}>
                Remove
              </button>
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 12, flexWrap: "wrap" }}>
            <button
              onClick={() => fileRef.current && fileRef.current.click()}
              style={{ padding: "9px 16px", borderRadius: 8, border: `1.5px solid ${C.border}`, background: C.white, color: C.navy, fontWeight: 700, fontSize: 13.5, cursor: "pointer" }}
            >
              Upload a file
            </button>
            <input ref={fileRef} type="file" accept=".txt,.docx,.pdf" onChange={handleFile} style={{ display: "none" }} />
            <button onClick={loadSample} style={{ padding: "9px 16px", borderRadius: 8, border: "none", background: "transparent", color: C.teal, fontWeight: 700, fontSize: 13.5, cursor: "pointer", textDecoration: "underline" }}>
              Try a sample worksheet
            </button>
            <span style={{ fontSize: 12.5, color: C.muted }}>Accepts .txt, .docx, and .pdf. Number each problem (1. 2. 3.) for the cleanest split.</span>
          </div>

          <button
            onClick={startConversion}
            disabled={busy}
            style={{ marginTop: 20, padding: "12px 22px", borderRadius: 10, border: "none", background: C.deep, color: C.white, fontWeight: 700, fontSize: 15, cursor: "pointer" }}
          >
            {busy ? busyLabel || "Working..." : "Convert to CAASPP format"}
          </button>
        </div>
      )}

      {/* Stage: Review */}
      {stage === "review" && (
        <div className="no-print">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
            <div style={{ fontSize: 14, color: C.muted }}>{questions.length} problem{questions.length !== 1 ? "s" : ""} converted. Change the format on any problem, then continue.</div>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 700, color: C.navy }}>
              <input type="checkbox" checked={showAnswer} onChange={(e) => setShowAnswer(e.target.checked)} />
              Show answer key
            </label>
          </div>

          {questions.map((q) => (
            <div key={q.id} style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 18, marginBottom: 16, background: C.white }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 10 }}>
                <div style={{ fontSize: 13, color: C.muted, fontStyle: "italic", whiteSpace: "pre-line" }}>
                  {q.original.includes("\n") ? "Original problems:\n" : "Original: "}{q.original}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, background: C.lightbg, color: C.teal, border: `1px solid ${C.border}` }}>
                  {TYPE_MAP[q.type] ? TYPE_MAP[q.type].label : q.type}
                </span>
                <select
                  value={q.type}
                  onChange={(e) => regenerate(q.id, e.target.value, q.feedback)}
                  disabled={q.loading}
                  style={{ padding: "6px 10px", borderRadius: 8, border: `1.5px solid ${C.border}`, fontSize: 13, fontWeight: 700, color: C.navy }}
                >
                  {ITEM_TYPES.map((t) => (
                    <option key={t.id} value={t.id}>{t.label}</option>
                  ))}
                </select>
                {q.loading && <span style={{ fontSize: 12.5, color: C.muted }}>Regenerating...</span>}
              </div>
              {q.rationale && <div style={{ fontSize: 12.5, color: C.muted, marginBottom: 12 }}>Why this format: {q.rationale}</div>}
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>{renderMathText(q.stem)}</div>
              <ItemVisual type={q.type} data={q.data} showAnswer={showAnswer} />

              <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${C.border}` }}>
                <label style={{ fontSize: 12.5, fontWeight: 700, color: C.navy, display: "block", marginBottom: 6 }}>
                  Request a specific change (optional)
                </label>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start", flexWrap: "wrap" }}>
                  <textarea
                    value={q.feedback || ""}
                    onChange={(e) => setFeedback(q.id, e.target.value)}
                    disabled={q.loading}
                    placeholder="e.g. use a real-world context about sports, use decimals instead of fractions, make it harder"
                    rows={2}
                    style={{ flex: "1 1 320px", minWidth: 260, padding: 10, borderRadius: 8, border: `1.5px solid ${C.border}`, fontSize: 13.5, resize: "vertical", boxSizing: "border-box" }}
                  />
                  <button
                    onClick={() => regenerate(q.id, q.type, q.feedback)}
                    disabled={q.loading}
                    style={{ padding: "10px 16px", borderRadius: 8, border: "none", background: C.teal, color: C.white, fontWeight: 700, fontSize: 13.5, cursor: "pointer", whiteSpace: "nowrap" }}
                  >
                    {q.loading ? "Regenerating..." : "Regenerate"}
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            <button onClick={() => setStage("input")} style={{ padding: "10px 18px", borderRadius: 8, border: `1.5px solid ${C.border}`, background: C.white, color: C.navy, fontWeight: 700, cursor: "pointer" }}>
              Back
            </button>
            <button onClick={() => setStage("export")} style={{ padding: "10px 18px", borderRadius: 8, border: "none", background: C.deep, color: C.white, fontWeight: 700, cursor: "pointer" }}>
              Continue to preview and export
            </button>
          </div>
        </div>
      )}

      {/* Stage: Export */}
      {stage === "export" && (
        <div>
          <div className="no-print" style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <button onClick={() => setStage("review")} style={{ padding: "10px 18px", borderRadius: 8, border: `1.5px solid ${C.border}`, background: C.white, color: C.navy, fontWeight: 700, cursor: "pointer" }}>
              Back to review
            </button>
            <button onClick={doPrint} style={{ padding: "10px 18px", borderRadius: 8, border: "none", background: C.deep, color: C.white, fontWeight: 700, cursor: "pointer" }}>
              Print / Save as PDF
            </button>
            <button onClick={downloadWord} style={{ padding: "10px 18px", borderRadius: 8, border: `1.5px solid ${C.teal}`, background: C.white, color: C.teal, fontWeight: 700, cursor: "pointer" }}>
              Download as Word
            </button>
            <button onClick={startOver} style={{ padding: "10px 18px", borderRadius: 8, border: "none", background: "transparent", color: C.muted, fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}>
              Start over
            </button>
          </div>
          <div className="no-print" style={{ fontSize: 12.5, color: C.muted, marginBottom: 16 }}>
            If the Print button doesn't open a dialog, use your browser's own Print command (Ctrl+P or Cmd+P) instead, it uses this same layout. Word export approximates formatting, for an exact layout use Print and save as PDF.
          </div>

          <div ref={printRef} className="print-area" style={{ display: "block" }}>
            <h2 style={{ fontFamily: "Georgia, serif", color: C.navy }}>CAASPP Practice Worksheet</h2>
            <p style={{ color: C.muted, fontSize: 13 }}>Name: _______________________________  Date: _______________</p>
            <hr style={{ border: "none", borderTop: `1px solid ${C.border}`, margin: "14px 0" }} />
            {questions.map((q, i) => (
              <div key={q.id} style={{ marginBottom: 26 }}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>{i + 1}. {renderMathText(q.stem)}</div>
                <ItemVisual type={q.type} data={q.data} showAnswer={false} />
              </div>
            ))}

            <div style={{ pageBreakBefore: "always", marginTop: 30 }}>
              <h2 style={{ fontFamily: "Georgia, serif", color: C.navy }}>Answer Key</h2>
              <hr style={{ border: "none", borderTop: `1px solid ${C.border}`, margin: "14px 0" }} />
              {questions.map((q, i) => (
                <div key={q.id} style={{ marginBottom: 26 }}>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>{i + 1}. {renderMathText(q.stem)}</div>
                  <ItemVisual type={q.type} data={q.data} showAnswer={true} />
                </div>
              ))}
            </div>
          </div>

          <div className="no-print">
            <h2 style={{ fontFamily: "Georgia, serif", color: C.navy, fontSize: 20 }}>Preview</h2>
            {questions.map((q, i) => (
              <div key={q.id} style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 18, marginBottom: 16, background: C.white }}>
                <div style={{ fontWeight: 700, marginBottom: 10 }}>{i + 1}. {renderMathText(q.stem)}</div>
                <ItemVisual type={q.type} data={q.data} showAnswer={showAnswer} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
