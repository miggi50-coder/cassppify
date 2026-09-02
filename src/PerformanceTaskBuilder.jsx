import React, { useState, useMemo } from "react";
import { C, ITEM_TYPES, SCHEMA_NOTE, callClaude, ItemVisual, typesBlock, renderMathText, DataTable, Graphing } from "./shared";
import { ALL_LESSONS } from "./topics";

function RubricTask({ task, showAnswer }) {
  const points = task.rubric_points === 3 ? 3 : 2;
  const criteria = task.rubric_criteria || [];
  return (
    <div>
      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 10 }}>{renderMathText(task.stem)}</div>
      <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>
        <div style={{ background: C.navy, color: "#fff", padding: "8px 14px", fontSize: 13, fontWeight: 700 }}>
          {points} point construct response rubric
        </div>
        {criteria.map((c, i) => (
          <div key={i} style={{ padding: "10px 14px", borderTop: i > 0 ? `1px solid ${C.border}` : "none", background: i % 2 ? C.lightbg : "#fff" }}>
            <span style={{ fontWeight: 700, color: C.teal, marginRight: 8 }}>{c.score} pt{c.score === 1 ? "" : "s"}:</span>
            <span style={{ fontSize: 13.5 }}>{renderMathText(c.description)}</span>
          </div>
        ))}
      </div>
      {showAnswer && task.sample_response && (
        <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 8, background: "#FFF7E6", border: "1px solid #F0D9A0", fontSize: 13.5 }}>
          <strong>Sample full credit response: </strong>{renderMathText(task.sample_response)}
        </div>
      )}
    </div>
  );
}

async function generatePerformanceTask(lessons, numQuestions, feedback) {
  const feedbackBlock = feedback && feedback.trim()
    ? `\nAdditional instructions from the teacher, follow carefully: ${feedback.trim()}\n`
    : "";
  const lessonList = lessons.map((l) => `- ${l.num} ${l.title} (${l.standard})`).join("\n");

  const prompt = `You are building a CAASPP (Smarter Balanced) style mathematics Performance Task for California Integrated Math 3 students, matching how real Smarter Balanced math performance tasks are actually constructed.

Real math performance tasks have three parts: a stimulus (the material students read and use), an optional classroom activity that introduces it, and a task set of 4 to 6 connected items that all draw on that same stimulus, usually ending in a written justification item scored with a rubric.

The stimulus is the part teachers most often get wrong when writing their own tasks: it is very rarely just a paragraph. Real Smarter Balanced math stimuli are grounded in actual data, most often a table of realistic numbers, and frequently a graph as well, that students must read and use across multiple questions, not just narrative description. Build the stimulus the same way:
- Always include "narrative": one to two sentences of scenario framing, kept short since the data itself is the substance.
- Decide independently, based on what genuinely fits these specific standards, whether to include a "table", a "graph", both, or neither. Real Smarter Balanced stimuli vary a lot: some are table only, some are graph only, some are a scenario with a few numbers embedded directly in the narrative and no visual at all, and some do use both. Do not default to including both every time, that becomes repetitive and stops looking like a real range of tasks. If you include "table": {"headers": [...], "rows": [[...], ...]} with realistic numbers. If you include "graph": {"xMin":..., "xMax":..., "yMin":..., "yMax":..., "points": [{"x":..,"y":..}, ...], "lineLabel": "..."}. Set either to null if it does not genuinely earn its place for this specific scenario.
- If you do include a table and/or graph, at least two of the task questions must explicitly reference it (e.g., "Using the table above...", "Based on the graph..."). If you decide neither earns its place here, build the questions around the numbers embedded in the narrative instead.

Base the task on these standards and lessons, weaving them together into ONE coherent real world scenario grounded in that shared data:
${lessonList}
${feedbackBlock}
Build a task set of exactly ${numQuestions} questions total, structured the way real task sets actually work, not just questions of increasing difficulty sitting side by side:
- Question 1 must be an entry point question: low difficulty, answerable directly from the stimulus (reading a value off the table or graph, or a single simple computation), so every student can get started and feel oriented before the reasoning gets harder.
- At least one middle question must explicitly build on the numeric or algebraic result of an earlier question, not just share its theme. Reference the earlier question directly in the stem, e.g. "Using your answer from Question 2, ..." and design the earlier question so this dependency is real, not decorative.
- Difficulty should climb across the set, ending with the extended response question as the hardest and most synthesizing item.
For the earlier questions, choose the best fit item type from:
${typesBlock()}

${SCHEMA_NOTE}

For the final extended response question only, instead of the schemas above, use this data shape:
{"rubric_points": 2 or 3, "rubric_criteria": [{"score": 0, "description": "..."}, {"score": 1, "description": "..."}, ...up to rubric_points], "sample_response": "a model full credit response"}

Return ONLY:
{
  "title": "short title for the task",
  "stimulus": {"narrative": "...", "table": {"headers": [...], "rows": [[...]]} or null, "graph": {"xMin":-5,"xMax":5,"yMin":-5,"yMax":5,"points":[...],"lineLabel":"..."} or null},
  "classroom_activity": "an optional short activity to introduce the stimulus, or empty string if not needed",
  "tasks": [
    {"item_type": "...", "stem": "...", "data": {...}},
    ...,
    {"item_type": "extended_response", "stem": "...", "data": {"rubric_points": 2, "rubric_criteria": [...], "sample_response": "..."}}
  ]
}
The tasks array must have exactly ${numQuestions} entries, with the extended_response one last.`;

  const json = await callClaude(prompt, { maxTokens: 9000 });
  if (!json.tasks || !Array.isArray(json.tasks)) throw new Error("Could not build the performance task.");
  return json;
}

export default function PerformanceTaskBuilder() {
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [numQuestions, setNumQuestions] = useState(4);
  const [feedback, setFeedback] = useState("");
  const [task, setTask] = useState(null);
  const [busy, setBusy] = useState(false);
  const [busyLabel, setBusyLabel] = useState("");
  const [error, setError] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return ALL_LESSONS;
    return ALL_LESSONS.filter((l) => (l.num + " " + l.title + " " + l.standard).toLowerCase().includes(q));
  }, [search]);

  function toggle(lesson) {
    setSelected((s) => {
      const exists = s.find((x) => x.num === lesson.num);
      if (exists) return s.filter((x) => x.num !== lesson.num);
      if (s.length >= 5) return s; // keep the scenario focused
      return [...s, lesson];
    });
  }

  async function build() {
    if (!selected.length) {
      setError("Pick at least one standard or topic first.");
      return;
    }
    setError("");
    setBusy(true);
    setBusyLabel("Building the performance task...");
    try {
      const result = await generatePerformanceTask(selected, numQuestions, feedback);
      setTask(result);
    } catch (e) {
      setError(e.message || "Could not build the performance task.");
    } finally {
      setBusy(false);
      setBusyLabel("");
    }
  }

  return (
    <div style={{ fontFamily: "Calibri, 'Segoe UI', system-ui, sans-serif", color: "#1A1A2E", maxWidth: 980, margin: "0 auto", padding: "0 16px 60px" }}>
      <div style={{ background: C.navy, color: "#fff", padding: "22px 24px", borderRadius: 12, margin: "20px 0" }}>
        <div style={{ fontSize: 12, letterSpacing: 1, fontWeight: 700, color: "#9FC3D9" }}>CAASPP DEEP DIVE TOOLKIT</div>
        <div style={{ fontSize: 26, fontWeight: 700, fontFamily: "Georgia, serif", marginTop: 4 }}>Performance Task Builder</div>
        <div style={{ fontSize: 14, color: "#CADCFC", marginTop: 4 }}>
          Pick up to five standards or topics, choose how many questions, and build a full connected Performance Task.
        </div>
      </div>

      {error && (
        <div style={{ background: "#FDEEEE", border: "1px solid #F0B8B8", color: "#8A3B3B", padding: "10px 14px", borderRadius: 8, marginBottom: 16, fontSize: 14 }}>
          {error}
        </div>
      )}

      <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 18, marginBottom: 20, background: "#fff" }}>
        <label style={{ fontSize: 12.5, fontWeight: 700, color: C.navy, display: "block", marginBottom: 6 }}>
          Standards or topics (up to 5)
        </label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by lesson name or standard code, e.g. radical, G-SRT.10"
          style={{ width: "100%", padding: "9px 10px", borderRadius: 8, border: `1.5px solid ${C.border}`, fontSize: 14, boxSizing: "border-box", marginBottom: 10 }}
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
          <div style={{ marginTop: 10, fontSize: 13, color: C.muted }}>
            Selected: {selected.map((s) => s.num).join(", ")}
          </div>
        )}

        <div style={{ display: "flex", gap: 20, alignItems: "flex-end", marginTop: 16, flexWrap: "wrap" }}>
          <div>
            <label style={{ fontSize: 12.5, fontWeight: 700, color: C.navy, display: "block", marginBottom: 6 }}>Number of questions</label>
            <input type="number" min={3} max={8} value={numQuestions} onChange={(e) => setNumQuestions(Math.max(3, Math.min(8, Number(e.target.value) || 3)))} style={{ width: 90, padding: "9px 10px", borderRadius: 8, border: `1.5px solid ${C.border}`, fontSize: 14, boxSizing: "border-box" }} />
          </div>
          <div style={{ flex: "1 1 260px" }}>
            <label style={{ fontSize: 12.5, fontWeight: 700, color: C.navy, display: "block", marginBottom: 6 }}>Anything specific? (optional)</label>
            <input type="text" value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="e.g. set it in a sports context, keep it to two pages" style={{ width: "100%", padding: "9px 10px", borderRadius: 8, border: `1.5px solid ${C.border}`, fontSize: 14, boxSizing: "border-box" }} />
          </div>
          <button onClick={build} disabled={busy} style={{ padding: "11px 20px", borderRadius: 10, border: "none", background: C.deep, color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
            {busy ? (busyLabel || "Working...") : "Build performance task"}
          </button>
        </div>
      </div>

      {task && (
        <div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 700, color: C.navy }}>
              <input type="checkbox" checked={showAnswer} onChange={(e) => setShowAnswer(e.target.checked)} />
              Show answer key
            </label>
          </div>

          <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, marginBottom: 20, background: "#fff" }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.navy, fontFamily: "Georgia, serif", marginBottom: 10 }}>{task.title}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.teal, marginBottom: 6 }}>STIMULUS</div>
            <div style={{ fontSize: 14.5, lineHeight: 1.6, marginBottom: task.stimulus?.table || task.stimulus?.graph ? 14 : 0 }}>
              {renderMathText(typeof task.stimulus === "string" ? task.stimulus : task.stimulus?.narrative)}
            </div>
            {task.stimulus?.table && (
              <div style={{ marginBottom: task.stimulus?.graph ? 14 : 0 }}>
                <DataTable headers={task.stimulus.table.headers} rows={task.stimulus.table.rows} />
              </div>
            )}
            {task.stimulus?.graph && (
              <div>
                <Graphing {...task.stimulus.graph} showAnswer={true} />
              </div>
            )}
            {task.classroom_activity && (
              <>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.teal, marginTop: 14, marginBottom: 6 }}>CLASSROOM ACTIVITY</div>
                <div style={{ fontSize: 14, fontStyle: "italic", color: C.muted }}>{renderMathText(task.classroom_activity)}</div>
              </>
            )}
          </div>

          {task.tasks.map((t, i) => (
            <div key={i} style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 18, marginBottom: 16, background: "#fff" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 8 }}>
                QUESTION {i + 1} OF {task.tasks.length}{t.item_type === "extended_response" ? " \u00b7 EXTENDED RESPONSE" : ""}
              </div>
              {t.item_type === "extended_response" ? (
                <RubricTask task={{ stem: t.stem, ...t.data }} showAnswer={showAnswer} />
              ) : (
                <>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>{renderMathText(t.stem)}</div>
                  <ItemVisual type={t.item_type} data={t.data} showAnswer={showAnswer} />
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
