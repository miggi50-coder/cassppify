import React from "react";
import * as mammoth from "mammoth";

/* ---------------- Design tokens (Ocean Gradient, matches the PD deck) ---------------- */
const C = {
  navy: "#21295C",
  deep: "#065A82",
  teal: "#1C7293",
  mint: "#5FB9A6",
  ink: "#1A1A2E",
  muted: "#5B6B76",
  lightbg: "#F2F6F8",
  border: "#DCE6EA",
  white: "#FFFFFF",
  amberBg: "#FFF7E6",
  amberBorder: "#F0D9A0",
  amberText: "#6B5A2A",
};

const ITEM_TYPES = [
  { id: "multiple_choice", label: "Multiple Choice", desc: "One correct response from a short list of options." },
  { id: "multi_select", label: "Multi Select", desc: "More than one correct response is required." },
  { id: "matching_tables", label: "Matching Tables", desc: "Match each row to the correct category in a grid." },
  { id: "equation_numeric", label: "Equation / Numeric", desc: "Student enters a value or expression directly, no options." },
  { id: "drag_and_drop", label: "Drag and Drop", desc: "Student places the correct tile into a blank or target." },
  { id: "hot_spot", label: "Hot Spot", desc: "Student marks the correct point, region, or object." },
  { id: "graphing", label: "Graphing", desc: "Student plots points or a line on a coordinate grid." },
  { id: "fill_in_table", label: "Fill In Table", desc: "Student completes missing values in a table." },
];
const TYPE_MAP = Object.fromEntries(ITEM_TYPES.map((t) => [t.id, t]));

const SCHEMA_NOTE = `
Return ONLY valid JSON, no markdown fences, no commentary. Use exactly this shape for each item's "data" field, matching its type:

multiple_choice: { "options": [{"id":"A","text":"..."}, ...], "correctId": "B" }
multi_select: { "options": [{"id":"A","text":"..."}, ...], "correctIds": ["B","C"] }
matching_tables: { "rows": ["row label 1","row label 2","row label 3"], "columns": ["col A","col B"], "correct": [0,1,0] }
equation_numeric: { "answerLabel": "x =", "correctAnswer": "9" }
drag_and_drop: { "template": "text with a single ___ blank", "tiles": ["opt1","opt2","opt3"], "correctTile": "opt2" }
hot_spot: { "lineMin": -5, "lineMax": 5, "correctValue": 3 }
graphing: { "xMin": -5, "xMax": 5, "yMin": -5, "yMax": 5, "points": [{"x":0,"y":-3},{"x":3,"y":3}], "lineLabel": "y = 2x - 3" }
fill_in_table: { "xValues": ["-2","-1","0","1","2"], "yValues": ["3","0","-1","?","?"], "correctYValues": ["3","0","-1","0","3"], "rowLabel": "f(x)" }

"correct" in matching_tables is the column index (0-based) that matches each row, in the same order as "rows".
For fill_in_table, "?" marks a blank cell in yValues; correctYValues gives the full correct row with no blanks.
Keep math content and difficulty equivalent to the original problem. Only change the response format.

MATH NOTATION: never use the "\u221A" character directly, it does not visually stretch over multi-character expressions and will look cut off. Whenever a problem involves a square root, write it as sqrt{...} with the full radicand inside the braces, for example sqrt{x + 1} or sqrt{2}. This applies inside "stem" and inside any text field in "data" (option text, tile labels, table cell values, etc).

Never write a rational expression with a plain "/" either, e.g. never write (x + 1)/(x - 2), since that reads as division and is hard to read once the numerator or denominator has more than one term. Instead write it as frac{numerator}{denominator}, for example frac{x + 1}{x - 2}. Nest sqrt{...} inside a frac{}{} or vice versa if needed, e.g. frac{sqrt{x}}{2}. This applies everywhere "stem" or any text field in "data" appears.
`.trim();

async function callClaude(content, { maxTokens = 4000 } = {}) {
  const resp = await fetch("/api/convert", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-5",
      max_tokens: maxTokens,
      messages: [{ role: "user", content }],
    }),
  });
  if (!resp.ok) {
    if (resp.status === 429) throw new Error("This site is getting a lot of requests right now, please wait a minute and try again.");
    let detail = "";
    try {
      const errJson = await resp.json();
      detail = errJson?.error?.message || errJson?.error || JSON.stringify(errJson);
    } catch (e) {
      try { detail = await resp.text(); } catch (e2) { /* ignore */ }
    }
    throw new Error("Request failed (" + resp.status + ")" + (detail ? ": " + detail : ""));
  }
  const data = await resp.json();
  const text = (data.content || [])
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n");
  const cleaned = text.replace(/```json|```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("Could not parse a response.");
  return JSON.parse(cleaned.slice(start, end + 1));
}

/* ---------------- File readers ---------------- */
function readAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Could not read that file."));
    reader.readAsText(file);
  });
}

function readAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read that file."));
    reader.readAsArrayBuffer(file);
  });
}

function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

async function extractTextFromDocx(file) {
  const buffer = await readAsArrayBuffer(file);
  const result = await mammoth.extractRawText({ arrayBuffer: buffer });
  return result.value || "";
}

async function splitFromPDF(file) {
  const buffer = await readAsArrayBuffer(file);
  const base64 = arrayBufferToBase64(buffer);
  const content = [
    {
      type: "document",
      source: { type: "base64", media_type: "application/pdf", data: base64 },
    },
    {
      type: "text",
      text:
        'This PDF is a math worksheet. Read it and split it into individual problems. Return ONLY JSON: {"questions": ["full text of problem 1", "full text of problem 2", ...]}. Keep each problem\'s full text together, including any sub parts or diagrams described in words. Do not solve anything, just extract and split.',
    },
  ];
  const json = await callClaude(content, { maxTokens: 3000 });
  if (!json.questions || !Array.isArray(json.questions)) throw new Error("Could not read problems out of that PDF.");
  return json.questions;
}

/* ---------------- Parsing the pasted worksheet into problems ---------------- */
function splitByNumbering(raw) {
  const lines = raw.split("\n");
  const markerRe = /^\s*(\d{1,2})[\.\)]\s+/;
  const indices = [];
  lines.forEach((l, i) => {
    if (markerRe.test(l)) indices.push(i);
  });
  if (indices.length < 2) return null;
  const chunks = [];
  for (let k = 0; k < indices.length; k++) {
    const from = indices[k];
    const to = k + 1 < indices.length ? indices[k + 1] : lines.length;
    const chunk = lines
      .slice(from, to)
      .join("\n")
      .replace(markerRe, "")
      .trim();
    if (chunk) chunks.push(chunk);
  }
  return chunks;
}

async function splitWithAI(raw) {
  const prompt =
    "Split the following worksheet text into individual math problems. Return ONLY JSON: {\"questions\": [\"full text of problem 1\", \"full text of problem 2\", ...]}. Keep each problem's full text together, including any sub parts. Do not solve anything, just split.\n\nWorksheet text:\n" +
    raw;
  const json = await callClaude(prompt, { maxTokens: 3000 });
  if (!json.questions || !Array.isArray(json.questions)) throw new Error("Could not split the worksheet into problems.");
  return json.questions;
}

/* ---------------- Batch conversion + single regeneration ---------------- */
function typesBlock() {
  return ITEM_TYPES.map((t) => {
    if (t.id === "matching_tables") {
      return `- ${t.id}: ${t.label}. ${t.desc} Also use this to combine a run of consecutive standalone true/false statements into ONE item: columns are "True" and "False", and each statement becomes its own row.`;
    }
    return `- ${t.id}: ${t.label}. ${t.desc}`;
  }).join("\n");
}

function normalizeGroups(groups, problemCount) {
  const covered = new Set();
  const clean = [];
  (groups || []).forEach((g) => {
    const idxs = (g.source_indices || []).filter(
      (i) => Number.isInteger(i) && i >= 0 && i < problemCount && !covered.has(i)
    );
    if (!idxs.length) return;
    idxs.forEach((i) => covered.add(i));
    clean.push({ ...g, source_indices: idxs });
  });
  // Anything the model missed becomes its own single-item group, in original order.
  for (let i = 0; i < problemCount; i++) {
    if (!covered.has(i)) clean.push({ source_indices: [i], recommended_type: null, rationale: "", stem: "", data: {} });
  }
  clean.sort((a, b) => Math.min(...a.source_indices) - Math.min(...b.source_indices));
  return clean;
}

async function convertAll(problems) {
  const prompt = `You are helping a California high school math teacher convert worksheet problems into CAASPP (Smarter Balanced) style items for Integrated Math 3 students.

Most problems below convert one-to-one into one item. The one exception: if you see a RUN of two or more CONSECUTIVE standalone true/false statements, combine that whole run into a single matching_tables item (columns "True" and "False", one row per statement), instead of converting each separately.

For each resulting item, pick the single best fit type from this list:
${typesBlock()}

${SCHEMA_NOTE}

Return ONLY: {"groups": [{"source_indices": [0], "recommended_type": "...", "rationale": "one short sentence", "stem": "...", "data": {...}}, {"source_indices": [1,2,3], "recommended_type": "matching_tables", "rationale": "...", "stem": "...", "data": {...}}, ...]}

"source_indices" lists which problem numbers below (0-based) that item covers. Every problem must appear in exactly one group, in ascending order overall.

Problems:
${problems.map((p, i) => `${i}. ${p}`).join("\n\n")}`;

  const json = await callClaude(prompt, { maxTokens: 8000 });
  if (!json.groups || !Array.isArray(json.groups)) throw new Error("Could not convert the problems.");
  return normalizeGroups(json.groups, problems.length);
}

async function convertOne(problem, forcedType, feedback) {
  const typeInfo = TYPE_MAP[forcedType];
  const feedbackBlock = feedback && feedback.trim()
    ? `\nThe teacher requested this specific change, follow it carefully: ${feedback.trim()}\n`
    : "";
  const prompt = `Convert this into a CAASPP (Smarter Balanced) style item using the "${typeInfo.label}" format (${typeInfo.desc}).
${feedbackBlock}
${SCHEMA_NOTE}

Return ONLY: {"recommended_type": "${forcedType}", "rationale": "one short sentence", "stem": "the question text as it should appear", "data": { ... matching the ${forcedType} schema ... } }

Problem: ${problem}`;
  const json = await callClaude(prompt, { maxTokens: 2000 });
  if (!json.data) throw new Error("Could not convert this problem.");
  return json;
}

/* ---------------- Visual renderers for each item type ---------------- */
function OptionsList({ options, correctId, correctIds, multi, showAnswer }) {
  const isCorrect = (id) => (multi ? (correctIds || []).includes(id) : id === correctId);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {(options || []).map((o) => {
        const correct = showAnswer && isCorrect(o.id);
        return (
          <div
            key={o.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 12px",
              borderRadius: 8,
              border: `1.5px solid ${correct ? C.teal : C.border}`,
              background: correct ? "#EAF4F1" : C.white,
            }}
          >
            <span
              style={{
                width: 22,
                height: 22,
                minWidth: 22,
                borderRadius: multi ? 4 : "50%",
                border: `2px solid ${correct ? C.teal : C.muted}`,
                background: correct ? C.teal : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                color: C.white,
                fontWeight: 700,
              }}
            >
              {correct ? "\u2713" : ""}
            </span>
            <span style={{ fontWeight: 700, color: C.teal, minWidth: 16 }}>{o.id}</span>
            <span>{renderMathText(o.text)}</span>
          </div>
        );
      })}
    </div>
  );
}

function MatchingTables({ rows, columns, correct, showAnswer }) {
  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={{ border: `1px solid ${C.border}`, padding: 8, background: C.lightbg }}></th>
          {(columns || []).map((c, i) => (
            <th key={i} style={{ border: `1px solid ${C.border}`, padding: 8, background: C.lightbg, color: C.teal, fontSize: 13 }}>
              {renderMathText(c)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {(rows || []).map((r, ri) => (
          <tr key={ri}>
            <td style={{ border: `1px solid ${C.border}`, padding: 8 }}>{renderMathText(r)}</td>
            {(columns || []).map((_, ci) => (
              <td key={ci} style={{ border: `1px solid ${C.border}`, padding: 8, textAlign: "center" }}>
                {showAnswer && correct && correct[ri] === ci ? (
                  <span style={{ display: "inline-block", width: 16, height: 16, borderRadius: "50%", background: C.teal }} />
                ) : (
                  ""
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function EquationNumeric({ answerLabel, correctAnswer, showAnswer }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontWeight: 700 }}>{answerLabel || "Answer ="}</span>
      <span
        style={{
          display: "inline-block",
          minWidth: 110,
          padding: "8px 12px",
          border: `2px solid ${C.teal}`,
          borderRadius: 8,
          background: C.white,
          fontWeight: 700,
          color: showAnswer ? C.navy : "transparent",
        }}
      >
        {showAnswer ? renderMathText(correctAnswer) : "\u00A0"}
      </span>
    </div>
  );
}

function DragAndDrop({ template, tiles, correctTile, showAnswer }) {
  const parts = (template || "___").split("___");
  return (
    <div>
      <div style={{ marginBottom: 12, fontSize: 15 }}>
        {renderMathText(parts[0])}
        <span
          style={{
            display: "inline-block",
            minWidth: 90,
            padding: "4px 10px",
            margin: "0 4px",
            border: `2px dashed ${C.teal}`,
            borderRadius: 6,
            textAlign: "center",
            fontWeight: 700,
            color: showAnswer ? C.navy : "transparent",
          }}
        >
          {showAnswer ? renderMathText(correctTile) : "\u00A0"}
        </span>
        {renderMathText(parts[1])}
      </div>
      <div style={{ fontSize: 12, color: C.muted, fontStyle: "italic", marginBottom: 6 }}>Drag from:</div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {(tiles || []).map((t, i) => {
          const correct = showAnswer && t === correctTile;
          return (
            <span
              key={i}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                fontWeight: 700,
                border: `1.5px solid ${correct ? C.deep : C.border}`,
                background: correct ? C.deep : C.lightbg,
                color: correct ? C.white : C.navy,
              }}
            >
              {renderMathText(t)}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function HotSpot({ lineMin, lineMax, correctValue, showAnswer }) {
  const min = lineMin ?? -5, max = lineMax ?? 5;
  const n = max - min;
  const w = 560, pad = 30;
  const step = (w - pad * 2) / n;
  return (
    <svg width={w} height={70} style={{ maxWidth: "100%" }}>
      <line x1={pad} y1={35} x2={w - pad} y2={35} stroke={C.muted} strokeWidth={1.5} />
      {Array.from({ length: n + 1 }).map((_, i) => {
        const val = min + i;
        const cx = pad + i * step;
        const correct = showAnswer && val === correctValue;
        return (
          <g key={i}>
            <line x1={cx} y1={30} x2={cx} y2={40} stroke={C.muted} strokeWidth={1} />
            <text x={cx} y={55} fontSize={11} fill={C.muted} textAnchor="middle">{val}</text>
            <circle cx={cx} cy={35} r={6} fill={correct ? C.teal : C.white} stroke={C.muted} strokeWidth={1} />
          </g>
        );
      })}
    </svg>
  );
}

function Graphing({ xMin, xMax, yMin, yMax, points, lineLabel, showAnswer }) {
  const x0 = xMin ?? -5, x1 = xMax ?? 5, y0 = yMin ?? -5, y1 = yMax ?? 5;
  const w = 320, h = 240, pad = 10;
  const gw = w - pad * 2, gh = h - pad * 2;
  const toPx = (mx, my) => {
    const px = pad + ((mx - x0) / (x1 - x0)) * gw;
    const py = pad + (1 - (my - y0) / (y1 - y0)) * gh;
    return [px, py];
  };
  const cols = x1 - x0, rows = y1 - y0;
  const [ax0, ay0] = toPx(0, y0), [ax1, ay1] = toPx(0, y1);
  const [bx0, by0] = toPx(x0, 0), [bx1, by1] = toPx(x1, 0);
  const pts = (points || []).map((p) => toPx(p.x, p.y));
  return (
    <svg width={w} height={h} style={{ border: `1px solid ${C.border}`, background: C.white }}>
      {Array.from({ length: cols + 1 }).map((_, i) => {
        const [px] = toPx(x0 + i, 0);
        return <line key={"v" + i} x1={px} y1={pad} x2={px} y2={h - pad} stroke="#E3EAEE" strokeWidth={0.75} />;
      })}
      {Array.from({ length: rows + 1 }).map((_, i) => {
        const [, py] = toPx(0, y0 + i);
        return <line key={"h" + i} x1={pad} y1={py} x2={w - pad} y2={py} stroke="#E3EAEE" strokeWidth={0.75} />;
      })}
      <line x1={ax0} y1={ay0} x2={ax1} y2={ay1} stroke={C.muted} strokeWidth={1.5} />
      <line x1={bx0} y1={by0} x2={bx1} y2={by1} stroke={C.muted} strokeWidth={1.5} />
      {showAnswer && pts.length >= 2 && (
        <line x1={pts[0][0]} y1={pts[0][1]} x2={pts[1][0]} y2={pts[1][1]} stroke={C.deep} strokeWidth={2.5} />
      )}
      {showAnswer && pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r={4} fill={C.deep} />)}
    </svg>
  );
}

function FillInTable({ xValues, yValues, correctYValues, rowLabel, showAnswer }) {
  const xs = xValues || [];
  const ys = yValues || [];
  const correct = correctYValues || [];
  return (
    <table style={{ borderCollapse: "collapse" }}>
      <tbody>
        <tr>
          <td style={{ border: `1px solid ${C.navy}`, background: C.navy, color: C.white, padding: "8px 14px", fontWeight: 700 }}>x</td>
          {xs.map((v, i) => (
            <td key={i} style={{ border: `1px solid ${C.navy}`, background: C.navy, color: C.white, padding: "8px 14px", fontWeight: 700, textAlign: "center" }}>
              {v}
            </td>
          ))}
        </tr>
        <tr>
          <td style={{ border: `1px solid ${C.border}`, background: C.lightbg, padding: "8px 14px", fontWeight: 700 }}>{rowLabel || "f(x)"}</td>
          {ys.map((v, i) => {
            const blank = v === "?";
            return (
              <td
                key={i}
                style={{
                  border: blank ? `1.5px dashed ${C.teal}` : `1px solid ${C.border}`,
                  background: blank ? C.amberBg : C.lightbg,
                  padding: "8px 14px",
                  textAlign: "center",
                  fontWeight: 700,
                }}
              >
                {blank ? (showAnswer ? renderMathText(correct[i]) : "\u00A0") : renderMathText(v)}
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
}

/* ---------------- Math text rendering (proper radicals and fractions) ---------------- */
// A plain "\u221A" character never stretches its bar over the radicand, and a
// "/" reads as division rather than a stacked fraction, both looking wrong or
// hard to read for anything beyond a single character. The model is
// instructed (see SCHEMA_NOTE) to mark these as sqrt{...} and frac{n}{d}; this
// renders them properly instead of trusting raw characters.
function Radical({ children }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "flex-start", margin: "0 1px" }}>
      <span style={{ fontSize: "1.05em", lineHeight: 1, marginRight: 1, transform: "translateY(1px)" }}>{"\u221A"}</span>
      <span style={{ borderTop: "1.5px solid currentColor", paddingTop: 1 }}>{children}</span>
    </span>
  );
}

function Fraction({ numerator, denominator }) {
  return (
    <span style={{ display: "inline-table", verticalAlign: "middle", margin: "0 3px", textAlign: "center", lineHeight: 1.2, fontSize: "0.95em" }}>
      <span style={{ display: "table-row" }}>
        <span style={{ display: "table-cell", padding: "0 4px 2px", borderBottom: "1.5px solid currentColor" }}>{numerator}</span>
      </span>
      <span style={{ display: "table-row" }}>
        <span style={{ display: "table-cell", padding: "2px 4px 0" }}>{denominator}</span>
      </span>
    </span>
  );
}

function renderMathText(text) {
  if (!text || typeof text !== "string") return text;
  if (!/sqrt\{|frac\{/.test(text)) return text;

  function readBraced(str, openBraceIdx) {
    let depth = 0;
    for (let j = openBraceIdx; j < str.length; j++) {
      if (str[j] === "{") depth++;
      else if (str[j] === "}") {
        depth--;
        if (depth === 0) return [str.slice(openBraceIdx + 1, j), j + 1];
      }
    }
    return [str.slice(openBraceIdx + 1), str.length];
  }

  const parts = [];
  let i = 0;
  let key = 0;
  while (i < text.length) {
    if (text.startsWith("sqrt{", i)) {
      const [content, next] = readBraced(text, i + 4);
      parts.push(<Radical key={key++}>{renderMathText(content)}</Radical>);
      i = next;
    } else if (text.startsWith("frac{", i)) {
      const [num, afterNum] = readBraced(text, i + 4);
      if (text[afterNum] === "{") {
        const [den, afterDen] = readBraced(text, afterNum);
        parts.push(<Fraction key={key++} numerator={renderMathText(num)} denominator={renderMathText(den)} />);
        i = afterDen;
      } else {
        parts.push(text[i]);
        i++;
      }
    } else {
      const nextSqrt = text.indexOf("sqrt{", i);
      const nextFrac = text.indexOf("frac{", i);
      let next = text.length;
      if (nextSqrt !== -1) next = Math.min(next, nextSqrt);
      if (nextFrac !== -1) next = Math.min(next, nextFrac);
      if (next === i) { parts.push(text[i]); i++; } else { parts.push(text.slice(i, next)); i = next; }
    }
  }
  return parts;
}

function DataTable({ headers, rows }) {
  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          {(headers || []).map((h, i) => (
            <th key={i} style={{ border: `1px solid ${C.border}`, padding: "8px 12px", background: C.navy, color: C.white, fontSize: 13, textAlign: "left" }}>
              {renderMathText(h)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {(rows || []).map((r, ri) => (
          <tr key={ri} style={{ background: ri % 2 ? C.lightbg : C.white }}>
            {r.map((cell, ci) => (
              <td key={ci} style={{ border: `1px solid ${C.border}`, padding: "8px 12px", fontSize: 13.5 }}>
                {renderMathText(String(cell))}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ItemVisual({ type, data, showAnswer }) {
  if (!data) return null;
  switch (type) {
    case "multiple_choice":
      return <OptionsList options={data.options} correctId={data.correctId} showAnswer={showAnswer} />;
    case "multi_select":
      return <OptionsList options={data.options} correctIds={data.correctIds} multi showAnswer={showAnswer} />;
    case "matching_tables":
      return <MatchingTables rows={data.rows} columns={data.columns} correct={data.correct} showAnswer={showAnswer} />;
    case "equation_numeric":
      return <EquationNumeric answerLabel={data.answerLabel} correctAnswer={data.correctAnswer} showAnswer={showAnswer} />;
    case "drag_and_drop":
      return <DragAndDrop template={data.template} tiles={data.tiles} correctTile={data.correctTile} showAnswer={showAnswer} />;
    case "hot_spot":
      return <HotSpot lineMin={data.lineMin} lineMax={data.lineMax} correctValue={data.correctValue} showAnswer={showAnswer} />;
    case "graphing":
      return <Graphing {...data} showAnswer={showAnswer} />;
    case "fill_in_table":
      return <FillInTable {...data} showAnswer={showAnswer} />;
    default:
      return null;
  }
}


export {
  C, ITEM_TYPES, TYPE_MAP, SCHEMA_NOTE,
  callClaude,
  readAsText, readAsArrayBuffer, arrayBufferToBase64, extractTextFromDocx, splitFromPDF,
  splitByNumbering, splitWithAI,
  typesBlock, normalizeGroups, convertAll, convertOne,
  OptionsList, MatchingTables, EquationNumeric, DragAndDrop, HotSpot, Graphing, FillInTable,
  ItemVisual, Radical, Fraction, renderMathText, DataTable,
};
