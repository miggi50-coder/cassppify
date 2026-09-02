import React, { useState, useMemo } from "react";
import { C, ITEM_TYPES, TYPE_MAP, SCHEMA_NOTE, callClaude, ItemVisual, renderMathText } from "./shared";
import { TOC } from "./topics";

function typesBlockLocal() {
  return ITEM_TYPES.map((t) => `- ${t.id}: ${t.label}. ${t.desc}`).join("\n");
}

async function generatePracticeSet(lesson, count, feedback) {
  const feedbackBlock = feedback && feedback.trim()
    ? `\nAdditional instructions from the teacher, follow carefully: ${feedback.trim()}\n`
    : "";
  const prompt = `You are writing original CAASPP (Smarter Balanced) style practice problems for a California Integrated Math 3 class.

Lesson: ${lesson.num} ${lesson.title}
CA Common Core standard: ${lesson.standard}
Module: ${lesson.module_title} (Module ${lesson.module}), Unit: ${lesson.unit_title}
${feedbackBlock}
Write ${count} original problems for this exact lesson and standard. Vary the item type across the set so students see different CAASPP formats, choosing from:
${typesBlockLocal()}

${SCHEMA_NOTE}

Return ONLY: {"results": [{"item_type": "...", "stem": "...", "data": {...}}, ...]}
Return exactly ${count} results.`;

  const json = await callClaude(prompt, { maxTokens: 6000 });
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
  const [unitIdx, setUnitIdx] = useState(0);
  const [moduleIdx, setModuleIdx] = useState(0);
  const [lessonIdx, setLessonIdx] = useState(0);
  const [count, setCount] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [problems, setProblems] = useState(null);
  const [busy, setBusy] = useState(false);
  const [busyLabel, setBusyLabel] = useState("");
  const [error, setError] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  const units = useMemo(() => {
    const seen = [];
    TOC.forEach((m) => {
      if (!seen.find((u) => u.unit === m.unit)) seen.push({ unit: m.unit, unit_title: m.unit_title });
    });
    return seen;
  }, []);
  const modulesInUnit = useMemo(() => TOC.filter((m) => m.unit === units[unitIdx]?.unit), [units, unitIdx]);
  const currentModule = modulesInUnit[moduleIdx] || modulesInUnit[0];
  const lessonsInModule = currentModule ? currentModule.lessons : [];
  const currentLesson = lessonsInModule[lessonIdx]
    ? { ...lessonsInModule[lessonIdx], module: currentModule.module, module_title: currentModule.module_title, unit: currentModule.unit, unit_title: currentModule.unit_title }
    : null;

  function onUnitChange(i) {
    setUnitIdx(i);
    setModuleIdx(0);
    setLessonIdx(0);
  }
  function onModuleChange(i) {
    setModuleIdx(i);
    setLessonIdx(0);
  }

  async function generate() {
    if (!currentLesson) return;
    setError("");
    setBusy(true);
    setBusyLabel(`Writing ${count} practice problems for ${currentLesson.num} ${currentLesson.title}...`);
    try {
      const results = await generatePracticeSet(currentLesson, count, feedback);
      setProblems(results.map((r, i) => ({ id: i, type: r.item_type, stem: r.stem, data: r.data || {}, feedback: "", loading: false })));
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
      const r = await regenerateOne(currentLesson, newType, fb);
      setProblems((ps) => ps.map((p) => (p.id === id ? { ...p, type: r.item_type, stem: r.stem, data: r.data || {}, loading: false } : p)));
    } catch (e) {
      setError(e.message || "Could not regenerate that problem.");
      setProblems((ps) => ps.map((p) => (p.id === id ? { ...p, loading: false } : p)));
    }
  }

  return (
    <div style={{ fontFamily: "Calibri, 'Segoe UI', system-ui, sans-serif", color: "#1A1A2E", maxWidth: 980, margin: "0 auto", padding: "0 16px 60px" }}>
      <div style={{ background: C.navy, color: "#fff", padding: "22px 24px", borderRadius: 12, margin: "20px 0" }}>
        <div style={{ fontSize: 12, letterSpacing: 1, fontWeight: 700, color: "#9FC3D9" }}>CAASPP DEEP DIVE TOOLKIT</div>
        <div style={{ fontSize: 26, fontWeight: 700, fontFamily: "Georgia, serif", marginTop: 4 }}>Topic Practice Generator</div>
        <div style={{ fontSize: 14, color: "#CADCFC", marginTop: 4 }}>
          Pick a lesson from the Integrated 3 scope and sequence, get original CAASPP style practice problems for it.
        </div>
      </div>

      {error && (
        <div style={{ background: "#FDEEEE", border: "1px solid #F0B8B8", color: "#8A3B3B", padding: "10px 14px", borderRadius: 8, marginBottom: 16, fontSize: 14 }}>
          {error}
        </div>
      )}

      <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 18, marginBottom: 20, background: "#fff" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          <div>
            <label style={{ fontSize: 12.5, fontWeight: 700, color: C.navy, display: "block", marginBottom: 6 }}>Unit</label>
            <select value={unitIdx} onChange={(e) => onUnitChange(Number(e.target.value))} style={selectStyle}>
              {units.map((u, i) => <option key={u.unit} value={i}>Unit {u.unit}: {u.unit_title}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 12.5, fontWeight: 700, color: C.navy, display: "block", marginBottom: 6 }}>Module</label>
            <select value={moduleIdx} onChange={(e) => onModuleChange(Number(e.target.value))} style={selectStyle}>
              {modulesInUnit.map((m, i) => <option key={m.module} value={i}>Module {m.module}: {m.module_title}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 12.5, fontWeight: 700, color: C.navy, display: "block", marginBottom: 6 }}>Lesson</label>
            <select value={lessonIdx} onChange={(e) => setLessonIdx(Number(e.target.value))} style={selectStyle}>
              {lessonsInModule.map((l, i) => <option key={l.num} value={i}>{l.num} {l.title}</option>)}
            </select>
          </div>
        </div>

        {currentLesson && (
          <div style={{ marginTop: 12, fontSize: 13, color: C.muted }}>
            Standard: <span style={{ fontWeight: 700, color: C.teal }}>{currentLesson.standard}</span>
          </div>
        )}

        <div style={{ display: "flex", gap: 20, alignItems: "flex-end", marginTop: 16, flexWrap: "wrap" }}>
          <div>
            <label style={{ fontSize: 12.5, fontWeight: 700, color: C.navy, display: "block", marginBottom: 6 }}>Number of problems</label>
            <input type="number" min={1} max={15} value={count} onChange={(e) => setCount(Math.max(1, Math.min(15, Number(e.target.value) || 1)))} style={{ ...selectStyle, width: 90 }} />
          </div>
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
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 700, color: C.navy }}>
              <input type="checkbox" checked={showAnswer} onChange={(e) => setShowAnswer(e.target.checked)} />
              Show answer key
            </label>
          </div>
          {problems.map((p, i) => (
            <div key={p.id} style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 18, marginBottom: 16, background: "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, background: C.lightbg, color: C.teal, border: `1px solid ${C.border}` }}>
                  {TYPE_MAP[p.type] ? TYPE_MAP[p.type].label : p.type}
                </span>
                <select
                  value={p.type}
                  onChange={(e) => regenerate(p.id, e.target.value, p.feedback)}
                  disabled={p.loading}
                  style={{ padding: "6px 10px", borderRadius: 8, border: `1.5px solid ${C.border}`, fontSize: 13, fontWeight: 700, color: C.navy }}
                >
                  {ITEM_TYPES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
                </select>
                {p.loading && <span style={{ fontSize: 12.5, color: C.muted }}>Regenerating...</span>}
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
        </>
      )}
    </div>
  );
}

const selectStyle = { width: "100%", padding: "9px 10px", borderRadius: 8, border: "1.5px solid #DCE6EA", fontSize: 14, boxSizing: "border-box" };
const primaryBtn = { padding: "11px 20px", borderRadius: 10, border: "none", background: "#065A82", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" };
