import React, { useState, useMemo, useRef } from "react";
import { C, ITEM_TYPES, TYPE_MAP, SCHEMA_NOTE, callClaude, ItemVisual, renderMathText, downloadQTI } from "./shared";
import { ALL_LESSONS } from "./topics";

function typesBlockLocal() {
  return ITEM_TYPES.map((t) => `- ${t.id}: ${t.label}. ${t.desc}`).join("\n");
}

async function generatePracticeSet(lessonsWithCounts, feedback) {
  const feedbackBlock = feedback && feedback.trim()
    ? `\nAdditional instructions from the teacher, follow carefully: ${feedback.trim()}\n`
    : "";
  const lessonList = lessonsWithCounts.map((l) => `- ${l.num} ${l.title} (${l.standard}): exactly ${l.count} problem${l.count === 1 ? "" : "s"}`).join("\n");
  const total = lessonsWithCounts.reduce((sum, l) => sum + l.count, 0);
  const prompt = `You are writing original CAASPP (Smarter Balanced) style practice problems for a California Integrated Math 3 class.

Lessons to cover, with the exact number of problems requested for each:
${lessonList}
${feedbackBlock}
Write exactly the requested number of problems for each lesson listed, no more and no fewer for any single lesson. Vary the item type across the whole set so students see different CAASPP formats, choosing from:
${typesBlockLocal()}

${SCHEMA_NOTE}

Return ONLY: {"results": [{"lesson_num": "the exact lesson number this problem targets, e.g. 9.1", "item_type": "...", "stem": "...", "data": {...}}, ...]}
Return exactly ${total} results total, matching the per-lesson counts above exactly.`;

  const json = await callClaude(prompt, { maxTokens: 8000 });
  if (!json.results || !Array.isArray(json.results)) throw new Error("Could not generate practice problems.");
  return json.results;
}

async function regenerateOne(lesson, currentType, feedback) {
  const typeInfo = TYPE_MAP[currentType];
  const feedbackBlock = feedback && feedback.trim()
    ? `\nThe teacher requested this specific change, follow it carefully: ${feedback.trim()}\n`
    : "";
  const prompt = `Write one original CAASPP style practice problem for California Integrated Math 3.

Lesson: ${lesson.num} ${lesson.title}
CA Common Core standard: ${lesson.standard}
Use the "${typeInfo.label}" format (${typeInfo.desc}).
${feedbackBlock}
${SCHEMA_NOTE}

Return ONLY: {"item_type": "${currentType}", "stem": "...", "data": {...}}`;
  const json = await callClaude(prompt, { maxTokens: 2000 });
  if (!json.data) throw new Error("Could not regenerate this problem.");
  return json;
}

export default function TopicPracticeGenerator() {
  const [selected, setSelected] = useState([]);
  const [counts, setCounts] = useState({});
  const [search, setSearch] = useState("");
  const [feedback, setFeedback] = useState("");
  const [problems, setProblems] = useState(null);
  const [busy, setBusy] = useState(false);
  const [busyLabel, setBusyLabel] = useState("");
  const [error, setError] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const printRef = useRef(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return ALL_LESSONS;
    return ALL_LESSONS.filter((l) => (l.num + " " + l.title + " " + l.standard).toLowerCase().includes(q));
  }, [search]);

  function toggle(lesson) {
    setSelected((s) => {
      const exists = s.find((x) => x.num === lesson.num);
      if (exists) return s.filter((x) => x.num !== lesson.num);
      return [...s, lesson];
    });
    setCounts((c) => {
      if (c[lesson.num] != null) {
        const next = { ...c };
        delete next[lesson.num];
        return next;
      }
      return { ...c, [lesson.num]: 3 };
    });
  }

  function setCount(num, value) {
    const n = Math.max(1, Math.min(15, Number(value) || 1));
    setCounts((c) => ({ ...c, [num]: n }));
  }

  const totalCount = selected.reduce((sum, l) => sum + (counts[l.num] || 3), 0);

  function lessonByNum(num) {
    return selected.find((l) => l.num === num) || ALL_LESSONS.find((l) => l.num === num);
  }

  async function generate() {
    if (!selected.length) {
      setError("Pick at least one lesson first.");
      return;
    }
    setError("");
    setBusy(true);
    const lessonsWithCounts = selected.map((l) => ({ ...l, count: counts[l.num] || 3 }));
    const total = lessonsWithCounts.reduce((sum, l) => sum + l.count, 0);
    setBusyLabel(`Writing ${total} practice problems across ${selected.length} lesson${selected.length > 1 ? "s" : ""}...`);
    try {
      const results = await generatePracticeSet(lessonsWithCounts, feedback);
      setProblems(results.map((r, i) => ({ id: i, lessonNum: r.lesson_num, type: r.item_type, stem: r.stem, data: r.data || {}, feedback: "", loading: false })));
    } catch (e) {
      setError(e.message || "Could not generate practice problems.");
    } finally {
      setBusy(false);
      setBusyLabel("");
    }
  }

  async function regenerate(id, newType, fb) {
    setProblems((ps) => ps.map((p) => (p.id === id ? { ...p, loading: true } : p)));
    try {
      const problem = problems.find((p) => p.id === id);
      const lesson = lessonByNum(problem?.lessonNum) || selected[0];
      const r = await regenerateOne(lesson, newType, fb);
      setProblems((ps) => ps.map((p) => (p.id === id ? { ...p, type: r.item_type, stem: r.stem, data: r.data || {}, loading: false } : p)));
    } catch (e) {
      setError(e.message || "Could not regenerate that problem.");
      setProblems((ps) => ps.map((p) => (p.id === id ? { ...p, loading: false } : p)));
    }
  }

  function deleteProblem(id) {
    setProblems((ps) => ps.filter((p) => p.id !== id));
  }

  function downloadCanvasQuiz() {
    setError("");
    try {
      const items = problems.map((p) => ({ type: p.type, stem: p.stem, data: p.data }));
      downloadQTI(exportTitle(), items);
    } catch (e) {
      setError("Could not build the Canvas quiz file: " + (e.message || e));
    }
  }

  function exportTitle() {
    if (selected.length === 1) return `${selected[0].num} ${selected[0].title}`;
    return `Practice Set (${selected.map((l) => l.num).join(", ")})`;
  }

  function buildExportHTML() {
    const node = printRef.current;
    if (!node) return null;
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${exportTitle()}</title>
<style>
  body { font-family: Calibri, 'Segoe UI', system-ui, sans-serif; color: #1A1A2E; padding: 28px; max-width: 900px; margin: 0 auto; }
  table { border-collapse: collapse; }
  h2 { font-family: Georgia, serif; color: ${C.navy}; }
  @media print { .page-break { page-break-before: always; } }
</style>
</head><body>${node.innerHTML}</body></html>`;
  }

  function doPrint() {
    setError("");
    try {
      window.print();
    } catch (e) {
      setError("This environment doesn't allow triggering print automatically. Use your browser's own Print command (Ctrl+P or Cmd+P) instead, it uses the same layout shown below.");
    }
  }

  function downloadWord() {
    setError("");
    try {
      const html = buildExportHTML();
      if (!html) return;
      const dataUri = "data:application/msword;charset=utf-8," + encodeURIComponent(html);
      const a = document.createElement("a");
      a.href = dataUri;
      a.download = exportTitle().replace(/[^a-z0-9]+/gi, "_") + ".doc";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      setError("Could not download a Word file in this environment. Use Print and choose Save as PDF instead.");
    }
  }

  return (
    <div style={{ fontFamily: "Calibri, 'Segoe UI', system-ui, sans-serif", color: "#1A1A2E", maxWidth: 980, margin: "0 auto", padding: "0 16px 60px" }}>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-area { display: block !important; }
        }
      `}</style>
      <div className="no-print" style={{ background: C.navy, color: "#fff", padding: "22px 24px", borderRadius: 12, margin: "20px 0" }}>
        <div style={{ fontSize: 12, letterSpacing: 1, fontWeight: 700, color: "#9FC3D9" }}>CAASPP DEEP DIVE TOOLKIT</div>
        <div style={{ fontSize: 26, fontWeight: 700, fontFamily: "Georgia, serif", marginTop: 4 }}>Topic Practice Generator</div>
        <div style={{ fontSize: 14, color: "#CADCFC", marginTop: 4 }}>
          Pick one or more lessons from the Integrated 3 scope and sequence, get original CAASPP style practice problems for them.
        </div>
      </div>

      {error && (
        <div className="no-print" style={{ background: "#FDEEEE", border: "1px solid #F0B8B8", color: "#8A3B3B", padding: "10px 14px", borderRadius: 8, marginBottom: 16, fontSize: 14 }}>
          {error}
        </div>
      )}

      <div className="no-print" style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 18, marginBottom: 20, background: "#fff" }}>
        <label style={{ fontSize: 12.5, fontWeight: 700, color: C.navy, display: "block", marginBottom: 6 }}>
          Lessons or standards (pick one or more)
        </label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by lesson name or standard code, e.g. radical, G-SRT.10"
          style={{ ...selectStyle, marginBottom: 10 }}
        />
        <div style={{ maxHeight: 220, overflowY: "auto", border: `1px solid ${C.border}`, borderRadius: 8 }}>
          {filtered.map((l) => {
            const checked = !!selected.find((x) => x.num === l.num);
            return (
              <div
                key={l.num}
                onClick={() => toggle(l)}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", cursor: "pointer", background: checked ? "#EAF4F1" : "#fff", borderBottom: `1px solid ${C.border}` }}
              >
                <input type="checkbox" checked={checked} readOnly />
                <span style={{ fontWeight: 700, color: C.teal, minWidth: 44 }}>{l.num}</span>
                <span style={{ fontSize: 13.5, flex: 1 }}>{l.title}</span>
                <span style={{ fontSize: 12, color: C.muted }}>{l.standard}</span>
              </div>
            );
          })}
        </div>
        {selected.length > 0 && (
          <div style={{ marginTop: 14 }}>
            <label style={{ fontSize: 12.5, fontWeight: 700, color: C.navy, display: "block", marginBottom: 8 }}>
              Problems per lesson
            </label>
            {selected.map((l) => (
              <div key={l.num} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontWeight: 700, color: C.teal, minWidth: 44, fontSize: 13.5 }}>{l.num}</span>
                <span style={{ fontSize: 13.5, flex: 1 }}>{l.title}</span>
                <input
                  type="number"
                  min={1}
                  max={15}
                  value={counts[l.num] ?? 3}
                  onChange={(e) => setCount(l.num, e.target.value)}
                  style={{ width: 60, padding: "6px 8px", borderRadius: 6, border: `1.5px solid ${C.border}`, fontSize: 13, textAlign: "center" }}
                />
              </div>
            ))}
            <div style={{ marginTop: 8, fontSize: 13, fontWeight: 700, color: C.navy }}>
              Total: {totalCount} problem{totalCount === 1 ? "" : "s"}
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 20, alignItems: "flex-end", marginTop: 16, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 260px" }}>
            <label style={{ fontSize: 12.5, fontWeight: 700, color: C.navy, display: "block", marginBottom: 6 }}>Anything specific? (optional)</label>
            <input type="text" value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="e.g. include a real-world context, keep numbers whole" style={{ ...selectStyle, width: "100%" }} />
          </div>
          <button onClick={generate} disabled={busy} style={primaryBtn}>
            {busy ? (busyLabel || "Working...") : "Generate practice set"}
          </button>
        </div>
      </div>

      {problems && (
        <>
          <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button onClick={doPrint} style={{ padding: "9px 16px", borderRadius: 8, border: "none", background: C.deep, color: "#fff", fontWeight: 700, fontSize: 13.5, cursor: "pointer" }}>
                Print / Save as PDF
              </button>
              <button onClick={downloadWord} style={{ padding: "9px 16px", borderRadius: 8, border: `1.5px solid ${C.teal}`, background: "#fff", color: C.teal, fontWeight: 700, fontSize: 13.5, cursor: "pointer" }}>
                Download as Word
              </button>
              <button onClick={downloadCanvasQuiz} style={{ padding: "9px 16px", borderRadius: 8, border: `1.5px solid ${C.deep}`, background: "#fff", color: C.deep, fontWeight: 700, fontSize: 13.5, cursor: "pointer" }}>
                Download for Canvas (QTI)
              </button>
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 700, color: C.navy }}>
              <input type="checkbox" checked={showAnswer} onChange={(e) => setShowAnswer(e.target.checked)} />
              Show answer key
            </label>
          </div>
          <div className="no-print" style={{ fontSize: 12, color: C.muted, marginBottom: 14, marginTop: -6 }}>
            If Print doesn't open a dialog, use Ctrl+P or Cmd+P instead, it uses this same layout. The Canvas file auto-grades Multiple Choice, Multi Select, Equation/Numeric, and Matching Tables; other formats import as manually-graded questions with the answer included for reference.
          </div>

          {/* On-screen preview, respects the answer key toggle */}
          <div className="no-print">
            {problems.map((p, i) => (
              <div key={p.id} style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 18, marginBottom: 16, background: "#fff" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, background: C.lightbg, color: C.teal, border: `1px solid ${C.border}` }}>
                    {TYPE_MAP[p.type] ? TYPE_MAP[p.type].label : p.type}
                  </span>
                  {selected.length > 1 && p.lessonNum && (
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.muted }}>Lesson {p.lessonNum}</span>
                  )}
                  <select
                    value={p.type}
                    onChange={(e) => regenerate(p.id, e.target.value, p.feedback)}
                    disabled={p.loading}
                    style={{ padding: "6px 10px", borderRadius: 8, border: `1.5px solid ${C.border}`, fontSize: 13, fontWeight: 700, color: C.navy }}
                  >
                    {ITEM_TYPES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
                  </select>
                  {p.loading && <span style={{ fontSize: 12.5, color: C.muted }}>Regenerating...</span>}
                  <button
                    onClick={() => deleteProblem(p.id)}
                    title="Delete this problem"
                    style={{ marginLeft: "auto", border: "none", background: "transparent", color: "#B33", fontWeight: 700, fontSize: 13, cursor: "pointer", padding: "2px 4px" }}
                  >
                    Delete
                  </button>
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>{i + 1}. {renderMathText(p.stem)}</div>
                <ItemVisual type={p.type} data={p.data} showAnswer={showAnswer} />

                <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${C.border}` }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start", flexWrap: "wrap" }}>
                    <textarea
                      value={p.feedback || ""}
                      onChange={(e) => setProblems((ps) => ps.map((q) => (q.id === p.id ? { ...q, feedback: e.target.value } : q)))}
                      disabled={p.loading}
                      placeholder="Request a specific change, e.g. use a real-world context"
                      rows={2}
                      style={{ flex: "1 1 320px", minWidth: 260, padding: 10, borderRadius: 8, border: `1.5px solid ${C.border}`, fontSize: 13.5, resize: "vertical", boxSizing: "border-box" }}
                    />
                    <button onClick={() => regenerate(p.id, p.type, p.feedback)} disabled={p.loading} style={{ ...primaryBtn, background: C.teal }}>
                      {p.loading ? "Regenerating..." : "Regenerate"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Print / export version: student copy, then a forced answer key section */}
          <div ref={printRef} className="print-area" style={{ display: "none" }}>
            <h2 style={{ fontFamily: "Georgia, serif", color: C.navy }}>{exportTitle()}</h2>
            <p style={{ color: C.muted, fontSize: 13 }}>Name: _______________________________  Date: _______________</p>
            <hr style={{ border: "none", borderTop: `1px solid ${C.border}`, margin: "14px 0" }} />
            {problems.map((p, i) => (
              <div key={p.id} style={{ marginBottom: 26 }}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>{i + 1}. {renderMathText(p.stem)}</div>
                <ItemVisual type={p.type} data={p.data} showAnswer={false} />
              </div>
            ))}
            <div className="page-break" style={{ pageBreakBefore: "always", marginTop: 30 }}>
              <h2 style={{ fontFamily: "Georgia, serif", color: C.navy }}>Answer Key</h2>
              <hr style={{ border: "none", borderTop: `1px solid ${C.border}`, margin: "14px 0" }} />
              {problems.map((p, i) => (
                <div key={p.id} style={{ marginBottom: 26 }}>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>{i + 1}. {renderMathText(p.stem)}</div>
                  <ItemVisual type={p.type} data={p.data} showAnswer={true} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const selectStyle = { width: "100%", padding: "9px 10px", borderRadius: 8, border: "1.5px solid #DCE6EA", fontSize: 14, boxSizing: "border-box" };
const primaryBtn = { padding: "11px 20px", borderRadius: 10, border: "none", background: "#065A82", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" };
