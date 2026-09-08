import React, { useState, useMemo, useRef } from "react";
import { C, ITEM_TYPES, TYPE_MAP, SCHEMA_NOTE, callClaude, ItemVisual, renderMathText, downloadQTI } from "./shared";
import { TARGET_SPECS } from "./targetSpecs";
import { TARGET_BANK } from "./targetBank";

function targetBankCount(evidenceKey) {
  return (TARGET_BANK[evidenceKey] || []).length;
}

function pickFromTargetBank(evidenceKey, count) {
  const bank = TARGET_BANK[evidenceKey];
  if (!bank || !bank.length) return [];
  const shuffled = [...bank].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function typesBlockForTarget() {
  return ITEM_TYPES.map((t) => `- ${t.id}: ${t.label}. ${t.desc}`).join("\n");
}

// Map a target's own "Allowable Item Types" (SBAC's language) onto this
// tool's 8 item types, so generation is steered toward formats the real
// target spec actually allows, not just whatever the model prefers.
function alignedTypes(target) {
  const raw = (target.item_types || []).join(" | ").toLowerCase();
  const allowed = [];
  if (raw.includes("multiple choice")) allowed.push("multiple_choice");
  if (raw.includes("multi-select") || raw.includes("multi select")) allowed.push("multi_select");
  if (raw.includes("matching")) allowed.push("matching_tables");
  if (raw.includes("equation") || raw.includes("numeric")) allowed.push("equation_numeric");
  if (raw.includes("drag and drop") || raw.includes("drag-and-drop")) allowed.push("drag_and_drop");
  if (raw.includes("hot spot")) allowed.push("hot_spot");
  if (raw.includes("graph")) allowed.push("graphing");
  if (raw.includes("fill-in table") || raw.includes("fill in table")) allowed.push("fill_in_table");
  return allowed.length ? allowed : ITEM_TYPES.map((t) => t.id);
}

function buildTargetContext(target, evidenceList) {
  const std = (target.standards || []).map((s) => `${s.code}: ${s.text}`).join("\n");
  const ev = evidenceList.map((e) => `${target.letter}${e.num}. ${e.text}`).join("\n");
  const allowed = alignedTypes(target);
  return `Target ${target.letter}: ${target.title}
Content domain: ${target.domain}

Standards:
${std}

Clarifications from the official target specification: ${target.clarifications || "None provided."}

Evidence Required statements to write problems for:
${ev}

Key vocabulary students should see used correctly: ${target.vocab || "None specified."}
${target.stimulus ? `Allowable stimulus materials: ${target.stimulus}` : ""}
${target.target_specific_attributes ? `Target-specific attributes to respect: ${target.target_specific_attributes}` : ""}
${target.non_target_constructs && target.non_target_constructs.toLowerCase() !== "none" ? `Non-target constructs, do not require these to answer: ${target.non_target_constructs}` : ""}

The official specification for this target only allows these item formats: ${allowed.map((a) => TYPE_MAP[a].label).join(", ")}. Only use formats from this list, even though the general list below has more options.`;
}

async function generateTargetSet(target, evidenceList, countsByEvidence, feedback) {
  const feedbackBlock = feedback && feedback.trim()
    ? `\nAdditional instructions from the teacher, follow carefully: ${feedback.trim()}\n`
    : "";
  const perEvidenceCounts = evidenceList
    .map((e) => `- Evidence ${target.letter}${e.num}: exactly ${countsByEvidence[e.num] || 3} problem${(countsByEvidence[e.num] || 3) === 1 ? "" : "s"}`)
    .join("\n");
  const total = evidenceList.reduce((sum, e) => sum + (countsByEvidence[e.num] || 3), 0);

  const prompt = `You are writing original CAASPP (Smarter Balanced) style items directly from an official target specification, for California Integrated Math 3 students.

${buildTargetContext(target, evidenceList)}

Write exactly the requested number of problems for each Evidence Required statement below, no more and no fewer for any single one:
${perEvidenceCounts}
${feedbackBlock}
Choose the best fit item type for each problem from the allowed list above only.

${SCHEMA_NOTE}

Return ONLY: {"results": [{"evidence_num": "the exact evidence number this problem targets, e.g. 1", "item_type": "...", "stem": "...", "data": {...}}, ...]}
Return exactly ${total} results total, matching the per-evidence counts above exactly.`;

  const json = await callClaude(prompt, { maxTokens: 8000 });
  if (!json.results || !Array.isArray(json.results)) throw new Error("Could not generate problems for this target.");
  return json.results;
}

async function regenerateTargetItem(target, evidenceItem, currentType, feedback) {
  const typeInfo = TYPE_MAP[currentType];
  const feedbackBlock = feedback && feedback.trim()
    ? `\nThe teacher requested this specific change, follow it carefully: ${feedback.trim()}\n`
    : "";
  const prompt = `Write one original CAASPP style item directly from an official target specification.

${buildTargetContext(target, [evidenceItem])}

Use the "${typeInfo.label}" format (${typeInfo.desc}) if it is on the allowed list above; if it genuinely is not allowed for this target, pick the closest allowed format instead and say so isn't needed, just produce the best allowed item.
${feedbackBlock}
${SCHEMA_NOTE}

Return ONLY: {"item_type": "...", "stem": "...", "data": {...}}`;
  const json = await callClaude(prompt, { maxTokens: 2000 });
  if (!json.data) throw new Error("Could not regenerate this problem.");
  return json;
}

export default function TargetGenerator() {
  const [targetLetter, setTargetLetter] = useState(TARGET_SPECS[0]?.letter || "A");
  const [selectedEvidence, setSelectedEvidence] = useState([]);
  const [counts, setCounts] = useState({});
  const [feedback, setFeedback] = useState("");
  const [useFreeBank, setUseFreeBank] = useState(true);
  const [problems, setProblems] = useState(null);
  const [busy, setBusy] = useState(false);
  const [busyLabel, setBusyLabel] = useState("");
  const [error, setError] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const printRef = useRef(null);

  const target = useMemo(() => TARGET_SPECS.find((t) => t.letter === targetLetter), [targetLetter]);

  function onTargetChange(letter) {
    setTargetLetter(letter);
    setSelectedEvidence([]);
    setCounts({});
  }

  function toggleEvidence(num) {
    setSelectedEvidence((s) => {
      if (s.includes(num)) return s.filter((n) => n !== num);
      return [...s, num];
    });
    setCounts((c) => {
      if (c[num] != null) {
        const next = { ...c };
        delete next[num];
        return next;
      }
      return { ...c, [num]: 3 };
    });
  }

  function setCount(num, value) {
    const n = Math.max(1, Math.min(15, Number(value) || 1));
    setCounts((c) => ({ ...c, [num]: n }));
  }

  const totalCount = selectedEvidence.reduce((sum, n) => sum + (counts[n] || 3), 0);
  const freeCount = useFreeBank
    ? selectedEvidence.reduce((sum, n) => sum + Math.min(counts[n] || 3, targetBankCount(targetLetter + n)), 0)
    : 0;
  const liveCount = totalCount - freeCount;

  function evidenceByNum(num) {
    return target.evidence.find((e) => e.num === num);
  }

  async function generate() {
    if (!selectedEvidence.length) {
      setError("Pick at least one Evidence Required statement first.");
      return;
    }
    setError("");
    setBusy(true);
    try {
      const fromBank = [];
      const needLiveEvidence = [];

      selectedEvidence.forEach((num) => {
        const wanted = counts[num] || 3;
        const evidenceKey = targetLetter + num;
        if (useFreeBank) {
          const picked = pickFromTargetBank(evidenceKey, wanted);
          picked.forEach((p) => fromBank.push({ evidenceNum: num, type: p.type, stem: p.stem, data: p.data }));
          const remaining = wanted - picked.length;
          if (remaining > 0) needLiveEvidence.push(evidenceByNum(num));
        } else {
          needLiveEvidence.push(evidenceByNum(num));
        }
      });

      const liveCounts = {};
      needLiveEvidence.forEach((e) => {
        const already = fromBank.filter((p) => p.evidenceNum === e.num).length;
        liveCounts[e.num] = Math.max(0, (counts[e.num] || 3) - already);
      });
      const stillNeeded = needLiveEvidence.filter((e) => liveCounts[e.num] > 0);

      let fromLive = [];
      if (stillNeeded.length) {
        const liveTotal = stillNeeded.reduce((sum, e) => sum + liveCounts[e.num], 0);
        setBusyLabel(`Writing ${liveTotal} problem${liveTotal > 1 ? "s" : ""}${fromBank.length ? " (the rest are free, built-in problems)" : ""}...`);
        const results = await generateTargetSet(target, stillNeeded, liveCounts, feedback);
        fromLive = results.map((r) => ({ evidenceNum: r.evidence_num, type: r.item_type, stem: r.stem, data: r.data || {} }));
      }

      const merged = [...fromBank, ...fromLive].map((p, i) => ({ id: i, ...p, feedback: "", loading: false }));
      setProblems(merged);
    } catch (e) {
      setError(e.message || "Could not generate problems.");
    } finally {
      setBusy(false);
      setBusyLabel("");
    }
  }

  async function regenerate(id, newType, fb) {
    setProblems((ps) => ps.map((p) => (p.id === id ? { ...p, loading: true } : p)));
    try {
      const problem = problems.find((p) => p.id === id);
      const evidenceItem = evidenceByNum(problem?.evidenceNum) || target.evidence[0];
      const r = await regenerateTargetItem(target, evidenceItem, newType, fb);
      setProblems((ps) => ps.map((p) => (p.id === id ? { ...p, type: r.item_type, stem: r.stem, data: r.data || {}, loading: false } : p)));
    } catch (e) {
      setError(e.message || "Could not regenerate that problem.");
      setProblems((ps) => ps.map((p) => (p.id === id ? { ...p, loading: false } : p)));
    }
  }

  function deleteProblem(id) {
    setProblems((ps) => ps.filter((p) => p.id !== id));
  }

  function exportTitle() {
    return `Target ${targetLetter}${selectedEvidence.length ? " (" + selectedEvidence.map((n) => targetLetter + n).join(", ") + ")" : ""}`;
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

  if (!target) return null;

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
        <div style={{ fontSize: 26, fontWeight: 700, fontFamily: "Georgia, serif", marginTop: 4 }}>Target Generator</div>
        <div style={{ fontSize: 14, color: "#CADCFC", marginTop: 4 }}>
          Pick a Claim 1 target, then one or more Evidence Required statements, straight from the official Smarter Balanced target specifications.
        </div>
      </div>

      {error && (
        <div className="no-print" style={{ background: "#FDEEEE", border: "1px solid #F0B8B8", color: "#8A3B3B", padding: "10px 14px", borderRadius: 8, marginBottom: 16, fontSize: 14 }}>
          {error}
        </div>
      )}

      <div className="no-print" style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 18, marginBottom: 20, background: "#fff" }}>
        <label style={{ fontSize: 12.5, fontWeight: 700, color: C.navy, display: "block", marginBottom: 6 }}>Target</label>
        <select value={targetLetter} onChange={(e) => onTargetChange(e.target.value)} style={targetSelectStyle}>
          {TARGET_SPECS.map((t) => (
            <option key={t.letter} value={t.letter}>{t.letter}: {t.title}</option>
          ))}
        </select>

        <div style={{ marginTop: 10, fontSize: 12.5, color: C.muted }}>
          Domain: <strong style={{ color: C.teal }}>{target.domain}</strong>
          {"  \u00b7  "}Standards: <strong style={{ color: C.teal }}>{(target.standards || []).map((s) => s.code).join(", ")}</strong>
        </div>

        <label style={{ fontSize: 12.5, fontWeight: 700, color: C.navy, display: "block", marginTop: 16, marginBottom: 6 }}>
          Evidence Required (pick one or more)
        </label>
        <div style={{ border: `1px solid ${C.border}`, borderRadius: 8 }}>
          {target.evidence.map((e) => {
            const checked = selectedEvidence.includes(e.num);
            return (
              <div
                key={e.num}
                onClick={() => toggleEvidence(e.num)}
                style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", cursor: "pointer", background: checked ? "#EAF4F1" : "#fff", borderBottom: `1px solid ${C.border}` }}
              >
                <input type="checkbox" checked={checked} readOnly style={{ marginTop: 3 }} />
                <span style={{ fontWeight: 700, color: C.teal, minWidth: 34 }}>{targetLetter}{e.num}</span>
                <span style={{ fontSize: 13.5, flex: 1 }}>{e.text}</span>
              </div>
            );
          })}
        </div>

        {selectedEvidence.length > 0 && (
          <div style={{ marginTop: 14 }}>
            <label style={{ fontSize: 12.5, fontWeight: 700, color: C.navy, display: "block", marginBottom: 8 }}>
              Problems per evidence statement
            </label>
            {selectedEvidence.map((num) => {
              const avail = targetBankCount(targetLetter + num);
              return (
                <div key={num} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontWeight: 700, color: C.teal, minWidth: 34, fontSize: 13.5 }}>{targetLetter}{num}</span>
                  <span style={{ fontSize: 13, flex: 1, color: C.muted }}>{evidenceByNum(num)?.text}</span>
                  {avail > 0 && (
                    <span style={{ fontSize: 11.5, color: C.mint, fontWeight: 700 }}>{avail} free available</span>
                  )}
                  <input
                    type="number"
                    min={1}
                    max={15}
                    value={counts[num] ?? 3}
                    onChange={(e) => setCount(num, e.target.value)}
                    style={{ width: 60, padding: "6px 8px", borderRadius: 6, border: `1.5px solid ${C.border}`, fontSize: 13, textAlign: "center" }}
                  />
                </div>
              );
            })}

            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 700, color: C.navy, marginTop: 12 }}>
              <input type="checkbox" checked={useFreeBank} onChange={(e) => setUseFreeBank(e.target.checked)} />
              Use free built-in problems when available (no AI cost)
            </label>

            <div style={{ marginTop: 8, fontSize: 13, fontWeight: 700, color: C.navy }}>
              Total: {totalCount} problem{totalCount === 1 ? "" : "s"}
              {useFreeBank && freeCount > 0 && (
                <span style={{ fontWeight: 400, color: C.muted }}> ({freeCount} free, {liveCount} generated live)</span>
              )}
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 20, alignItems: "flex-end", marginTop: 16, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 260px" }}>
            <label style={{ fontSize: 12.5, fontWeight: 700, color: C.navy, display: "block", marginBottom: 6 }}>Anything specific? (optional)</label>
            <input type="text" value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="e.g. include a real-world context, keep numbers whole" style={{ ...targetSelectStyle, width: "100%" }} />
          </div>
          <button onClick={generate} disabled={busy} style={targetPrimaryBtn}>
            {busy ? (busyLabel || "Working...") : "Generate problem set"}
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
            If Print doesn't open a dialog, use Ctrl+P or Cmd+P instead. The Canvas file auto-grades Multiple Choice, Multi Select, Equation/Numeric, and Matching Tables; other formats import as manually-graded questions.
          </div>

          {/* On-screen preview, respects the answer key toggle */}
          <div className="no-print">
            {problems.map((p, i) => (
              <div key={p.id} style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 18, marginBottom: 16, background: "#fff" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, background: C.lightbg, color: C.teal, border: `1px solid ${C.border}` }}>
                    {TYPE_MAP[p.type] ? TYPE_MAP[p.type].label : p.type}
                  </span>
                  {p.evidenceNum && (
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.muted }}>Evidence {targetLetter}{p.evidenceNum}</span>
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
                    <button onClick={() => regenerate(p.id, p.type, p.feedback)} disabled={p.loading} style={{ ...targetPrimaryBtn, background: C.teal }}>
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

const targetSelectStyle = { width: "100%", padding: "9px 10px", borderRadius: 8, border: "1.5px solid #DCE6EA", fontSize: 14, boxSizing: "border-box" };
const targetPrimaryBtn = { padding: "11px 20px", borderRadius: 10, border: "none", background: "#065A82", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" };
