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
  { id: "multiple_choice", label: "Multiple Choice", desc: "Exactly 4 options, one correct response, with wrong options based on real student errors." },
  { id: "multi_select", label: "Multi Select", desc: "4 to 6 options, more than one correct response, with wrong options based on real student errors." },
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
graphing: { "xMin": -5, "xMax": 5, "yMin": -5, "yMax": 5, "points": [{"x":0,"y":-3},{"x":3,"y":3}], "lineLabel": "y = 2x - 3", "xLabel": "time (hours)", "yLabel": "distance (miles)" }
fill_in_table: { "xValues": ["-2","-1","0","1","2"], "yValues": ["3","0","-1","?","?"], "correctYValues": ["3","0","-1","0","3"], "rowLabel": "f(x)" }

"correct" in matching_tables is the column index (0-based) that matches each row, in the same order as "rows".
For fill_in_table, "?" marks a blank cell in yValues; correctYValues gives the full correct row with no blanks.
Keep math content and difficulty equivalent to the original problem. Only change the response format.

DEPTH OF KNOWLEDGE (DOK): Real CAASPP items are written to a specific reasoning depth, not just a difficulty level. Use these four levels and vary them across any multi-problem set rather than writing every problem at the same depth:
- DOK 1: recall or a single direct computation (apply a formula, execute a known procedure).
- DOK 2: apply a skill or concept with some decision making (choose the right method, work with two related steps, interpret a representation).
- DOK 3: strategic thinking, multi-step reasoning, justify or explain why, non-routine problems with more than one reasonable path.
- DOK 4: extended reasoning connecting multiple concepts over a real, involved scenario. This fits a Performance Task's extended response far better than a single CAT-style item; do not force DOK 4 onto a single short item.
When generating more than one problem, distribute them across DOK 1 through 3 rather than making them all the same depth, and let harder DOK levels use item types built for reasoning (equation_numeric, matching_tables, drag_and_drop) rather than defaulting everything to multiple_choice.

MULTIPLE CHOICE AND MULTI SELECT DISTRACTORS: multiple_choice must have exactly 4 options, no more and no fewer. multi_select should have 4 to 6 options. Every wrong option must come from a specific, describable student error, not just a random nearby number. Base each wrong option on a real, common mistake for that skill: a sign error, forgetting a step, applying the wrong operation or formula, an order of operations slip, a copying error in the exponent or coefficient, confusing two similar rules, or a partial solution mistaken for the final one. Do not include an option that isn't traceable to a specific plausible mistake, and do not reuse the same kind of error for every option in one item.

MATH NOTATION: never use the "\u221A" character directly, it does not visually stretch over multi-character expressions and will look cut off. Whenever a problem involves a square root, write it as sqrt{...} with the full radicand inside the braces, for example sqrt{x + 1} or sqrt{2}. This applies inside "stem" and inside any text field in "data" (option text, tile labels, table cell values, etc).

Never write any fraction with a plain "/" either, whether it is a simple numeric fraction like 3/4 or an algebraic rational expression like (x + 1)/(x - 2). A "/" reads as division and is hard to read, especially once the numerator or denominator has more than one term. Instead write every fraction as frac{numerator}{denominator}, for example frac{3}{4} or frac{x + 1}{x - 2}. Nest sqrt{...} inside a frac{}{} or vice versa if needed, e.g. frac{sqrt{x}}{2}. This applies everywhere "stem" or any text field in "data" appears, with no exceptions for "simple" fractions.

For a root other than a square root, write sqrt[n]{...} with the index in square brackets before the braces, for example sqrt[3]{x} for the cube root of x, or sqrt[4]{16}. Do not write "cube root of x" as a word phrase if a symbol is more natural, and never leave the brackets and braces as literal visible text in a way that suggests you forgot to close them.

For any exponent that is more than a single plain digit or variable, or that includes a symbol such as a negative sign, a fraction, or more than one character, write it as ^{...} with the exponent inside curly braces, for example f^{-1}(x) for an inverse function, x^{2n}, or (3x)^{1/2}. A simple single-character exponent like x^2 can stay as plain characters without braces. Never write an exponent inside parentheses like f^(-1)(x), that renders as literal text; always use the curly brace form f^{-1}(x) instead.

For a subscript, such as a sequence term or a logarithm base, write it as _{...} with the subscript inside curly braces, for example a_{n} for a sequence term, a_{n-1} for the previous term, or log_{2}(x) for a base 2 logarithm. A simple single-character subscript like a_n can stay as plain characters without braces if you prefer, but _{...} is always safe.

Never approximate comparison symbols with ASCII characters. Always use the real symbol directly: \u2264 for less than or equal to, \u2265 for greater than or equal to, \u2260 for not equal to. Never write "<=", ">=", or "!=".

sqrt{...} / sqrt[n]{...}, frac{...}{...}, ^{...}, and _{...} are the ONLY special notations, because roots, fractions, multi-character exponents, and subscripts are the only things that render incorrectly as plain characters. Every other math symbol should be typed as an ordinary plain character, normally, with no special notation and no LaTeX-style commands: use × or · for multiplication, ÷ for division, ≤ ≥ ≠ for comparisons, = for equals, and so on. Never write \\cdot, \\div, \\times, or the bare words "cdot", "div", or "times" as substitutes for these ordinary symbols, that is not what the special notations above are for and it will show up as literal broken text.
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
      <span style={{ fontWeight: 700 }}>{renderMathText(answerLabel) || "Answer ="}</span>
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

function niceStep(range) {
  if (range <= 10) return 1;
  if (range <= 20) return 2;
  if (range <= 50) return 5;
  return Math.ceil(range / 10);
}

function Graphing({ xMin, xMax, yMin, yMax, points, lineLabel, xLabel, yLabel, showAnswer }) {
  const x0 = xMin ?? -5, x1 = xMax ?? 5, y0 = yMin ?? -5, y1 = yMax ?? 5;
  const padL = 36, padB = 42, padT = 18, padR = 18;
  const w = 360, h = 300;
  const gw = w - padL - padR, gh = h - padT - padB;
  const toPx = (mx, my) => {
    const px = padL + ((mx - x0) / (x1 - x0)) * gw;
    const py = padT + (1 - (my - y0) / (y1 - y0)) * gh;
    return [px, py];
  };
  const xStep = niceStep(x1 - x0);
  const yStep = niceStep(y1 - y0);
  const xTicks = [];
  for (let v = Math.ceil(x0 / xStep) * xStep; v <= x1; v += xStep) xTicks.push(v);
  const yTicks = [];
  for (let v = Math.ceil(y0 / yStep) * yStep; v <= y1; v += yStep) yTicks.push(v);

  const [ax0, ay0] = toPx(0, y0), [ax1, ay1] = toPx(0, y1);
  const [bx0, by0] = toPx(x0, 0), [bx1, by1] = toPx(x1, 0);
  const pts = (points || []).map((p) => toPx(p.x, p.y));
  const originVisible = x0 <= 0 && 0 <= x1 && y0 <= 0 && 0 <= y1;
  const [ox, oy] = toPx(0, 0);
  const tickLabelY = h - padB + 14;

  return (
    <div>
      <svg width={w} height={h} style={{ border: `1px solid ${C.border}`, background: C.white }}>
        {xTicks.map((v) => {
          const [px] = toPx(v, 0);
          return <line key={"vg" + v} x1={px} y1={padT} x2={px} y2={h - padB} stroke="#E3EAEE" strokeWidth={0.75} />;
        })}
        {yTicks.map((v) => {
          const [, py] = toPx(0, v);
          return <line key={"hg" + v} x1={padL} y1={py} x2={w - padR} y2={py} stroke="#E3EAEE" strokeWidth={0.75} />;
        })}
        <line x1={ax0} y1={ay0} x2={ax1} y2={ay1} stroke={C.ink} strokeWidth={1.5} />
        <line x1={bx0} y1={by0} x2={bx1} y2={by1} stroke={C.ink} strokeWidth={1.5} />
        {xTicks.map((v) => {
          const [px, py] = toPx(v, 0);
          if (v === 0) return null;
          return (
            <g key={"vt" + v}>
              <line x1={px} y1={py - 3} x2={px} y2={py + 3} stroke={C.ink} strokeWidth={1} />
              <text x={px} y={tickLabelY} fontSize={10} fill={C.ink} textAnchor="middle">{v}</text>
            </g>
          );
        })}
        {yTicks.map((v) => {
          const [px, py] = toPx(0, v);
          if (v === 0) return null;
          return (
            <g key={"ht" + v}>
              <line x1={px - 3} y1={py} x2={px + 3} y2={py} stroke={C.ink} strokeWidth={1} />
              <text x={Math.max(px - 8, padL - 8)} y={py + 3} fontSize={10} fill={C.ink} textAnchor="end">{v}</text>
            </g>
          );
        })}
        {originVisible && <text x={ox - 6} y={oy + 12} fontSize={10} fill={C.ink} textAnchor="end">0</text>}
        <text x={w - padR} y={h - 6} fontSize={11} fill={C.navy} fontWeight="bold" textAnchor="end">{xLabel || "x"}</text>
        <text x={padL + 4} y={padT + 10} fontSize={11} fill={C.navy} fontWeight="bold" textAnchor="start">{yLabel || "y"}</text>
        {showAnswer && pts.length >= 2 && (
          <line x1={pts[0][0]} y1={pts[0][1]} x2={pts[1][0]} y2={pts[1][1]} stroke={C.deep} strokeWidth={2.5} />
        )}
        {showAnswer && pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r={4} fill={C.deep} />)}
      </svg>
      {lineLabel && showAnswer && (
        <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{renderMathText(lineLabel)}</div>
      )}
    </div>
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
              {renderMathText(v)}
            </td>
          ))}
        </tr>
        <tr>
          <td style={{ border: `1px solid ${C.border}`, background: C.lightbg, padding: "8px 14px", fontWeight: 700 }}>{renderMathText(rowLabel) || "f(x)"}</td>
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
function Radical({ children, index }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "flex-start", margin: "0 1px" }}>
      {index && (
        <span style={{ fontSize: "0.6em", lineHeight: 1, position: "relative", top: "-0.4em", marginRight: "-1px" }}>{index}</span>
      )}
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

function cleanStrayLatex(text) {
  if (!text || typeof text !== "string") return text;
  // Safe, narrow cleanup: only unambiguous tokens that never legitimately
  // appear in ordinary English text, so a blind replace can't corrupt prose.
  return text
    .replace(/\\cdot/g, "\u00b7")
    .replace(/\\times/g, "\u00d7")
    .replace(/\\div/g, "\u00f7")
    .replace(/<=/g, "\u2264")
    .replace(/>=/g, "\u2265")
    .replace(/!=/g, "\u2260");
}

function renderMathText(text) {
  if (!text || typeof text !== "string") return text;
  text = cleanStrayLatex(text);
  if (!/sqrt[\[{]|frac\{|[\^_][A-Za-z0-9{-]/.test(text)) return text;

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

  const simpleTokenRe = /^-?[A-Za-z0-9]+/;

  const parts = [];
  let i = 0;
  let key = 0;
  while (i < text.length) {
    if (text.startsWith("sqrt[", i)) {
      const closeBracket = text.indexOf("]", i);
      if (closeBracket !== -1 && text[closeBracket + 1] === "{") {
        const indexStr = text.slice(i + 5, closeBracket);
        const [content, next] = readBraced(text, closeBracket + 1);
        parts.push(<Radical key={key++} index={indexStr}>{renderMathText(content)}</Radical>);
        i = next;
        continue;
      }
      parts.push(text[i]); i++; continue;
    }
    if (text.startsWith("sqrt{", i)) {
      const [content, next] = readBraced(text, i + 4);
      parts.push(<Radical key={key++}>{renderMathText(content)}</Radical>);
      i = next;
      continue;
    }
    if (text.startsWith("frac{", i)) {
      const [num, afterNum] = readBraced(text, i + 4);
      if (text[afterNum] === "{") {
        const [den, afterDen] = readBraced(text, afterNum);
        parts.push(<Fraction key={key++} numerator={renderMathText(num)} denominator={renderMathText(den)} />);
        i = afterDen;
        continue;
      }
      parts.push(text[i]); i++; continue;
    }
    if (text[i] === "^" && text[i + 1] === "{") {
      const [content, next] = readBraced(text, i + 1);
      parts.push(<sup key={key++}>{renderMathText(content)}</sup>);
      i = next;
      continue;
    }
    if (text[i] === "_" && text[i + 1] === "{") {
      const [content, next] = readBraced(text, i + 1);
      parts.push(<sub key={key++}>{renderMathText(content)}</sub>);
      i = next;
      continue;
    }
    if (text[i] === "^" && /[A-Za-z0-9-]/.test(text[i + 1] || "")) {
      const m = simpleTokenRe.exec(text.slice(i + 1));
      if (m) {
        parts.push(<sup key={key++}>{m[0]}</sup>);
        i = i + 1 + m[0].length;
        continue;
      }
    }
    if (text[i] === "_" && /[A-Za-z0-9-]/.test(text[i + 1] || "")) {
      const m = simpleTokenRe.exec(text.slice(i + 1));
      if (m) {
        parts.push(<sub key={key++}>{m[0]}</sub>);
        i = i + 1 + m[0].length;
        continue;
      }
    }
    {
      const markers = ["sqrt[", "sqrt{", "frac{"];
      let next = text.length;
      markers.forEach((m) => {
        const idx = text.indexOf(m, i);
        if (idx !== -1) next = Math.min(next, idx);
      });
      for (let j = i; j < text.length; j++) {
        if (text[j] === "^" || text[j] === "_") { next = Math.min(next, j); break; }
      }
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


/* ---------------- Plain-text math for QTI export ---------------- */
// QTI is plain XML text, it can't render our Radical/Fraction React
// components, so sqrt{...} and frac{a}{b} need a readable plain-text form.
function mathTextToPlain(text) {
  if (!text || typeof text !== "string") return text || "";
  text = cleanStrayLatex(text);
  if (!/sqrt[\[{]|frac\{|[\^_][A-Za-z0-9{-]/.test(text)) return text;

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

  const simpleTokenRe = /^-?[A-Za-z0-9]+/;

  let out = "";
  let i = 0;
  while (i < text.length) {
    if (text.startsWith("sqrt[", i)) {
      const closeBracket = text.indexOf("]", i);
      if (closeBracket !== -1 && text[closeBracket + 1] === "{") {
        const indexStr = text.slice(i + 5, closeBracket);
        const [content, next] = readBraced(text, closeBracket + 1);
        out += "(" + mathTextToPlain(content) + ")^(1/" + indexStr + ")";
        i = next;
        continue;
      }
      out += text[i]; i++; continue;
    }
    if (text.startsWith("sqrt{", i)) {
      const [content, next] = readBraced(text, i + 4);
      out += "sqrt(" + mathTextToPlain(content) + ")";
      i = next;
      continue;
    }
    if (text.startsWith("frac{", i)) {
      const [num, afterNum] = readBraced(text, i + 4);
      if (text[afterNum] === "{") {
        const [den, afterDen] = readBraced(text, afterNum);
        out += "(" + mathTextToPlain(num) + ")/(" + mathTextToPlain(den) + ")";
        i = afterDen;
        continue;
      }
      out += text[i]; i++; continue;
    }
    if (text[i] === "^" && text[i + 1] === "{") {
      const [content, next] = readBraced(text, i + 1);
      out += "^(" + mathTextToPlain(content) + ")";
      i = next;
      continue;
    }
    if (text[i] === "_" && text[i + 1] === "{") {
      const [content, next] = readBraced(text, i + 1);
      out += "_(" + mathTextToPlain(content) + ")";
      i = next;
      continue;
    }
    if (text[i] === "^" && /[A-Za-z0-9-]/.test(text[i + 1] || "")) {
      const m = simpleTokenRe.exec(text.slice(i + 1));
      if (m) { out += "^" + m[0]; i = i + 1 + m[0].length; continue; }
    }
    if (text[i] === "_" && /[A-Za-z0-9-]/.test(text[i + 1] || "")) {
      const m = simpleTokenRe.exec(text.slice(i + 1));
      if (m) { out += "_" + m[0]; i = i + 1 + m[0].length; continue; }
    }
    {
      const markers = ["sqrt[", "sqrt{", "frac{"];
      let next = text.length;
      markers.forEach((m) => {
        const idx = text.indexOf(m, i);
        if (idx !== -1) next = Math.min(next, idx);
      });
      for (let j = i; j < text.length; j++) {
        if (text[j] === "^" || text[j] === "_") { next = Math.min(next, j); break; }
      }
      if (next === i) { out += text[i]; i++; } else { out += text.slice(i, next); i = next; }
    }
  }
  return out;
}

function containsMathNotation(text) {
  return /sqrt[\[{]|frac\{|[\^_][A-Za-z0-9{-]/.test(String(text || ""));
}

// QTI material can be marked text/html, and Canvas's importer renders that
// HTML in the question. This gives a real stacked fraction, radical, and
// superscript/subscript in the actual Canvas quiz, instead of the flattened
// "(3)/(2)" plain-text fallback.
function mathTextToHTML(text) {
  if (!text || typeof text !== "string") return "";
  text = cleanStrayLatex(text);

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
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
  const simpleTokenRe = /^-?[A-Za-z0-9]+/;

  let out = "";
  let i = 0;
  while (i < text.length) {
    if (text.startsWith("sqrt[", i)) {
      const closeBracket = text.indexOf("]", i);
      if (closeBracket !== -1 && text[closeBracket + 1] === "{") {
        const indexStr = text.slice(i + 5, closeBracket);
        const [content, next] = readBraced(text, closeBracket + 1);
        out += '<span style="display:inline-flex;align-items:flex-start;">' +
          '<span style="font-size:0.6em;position:relative;top:-0.4em;margin-right:-1px;">' + esc(indexStr) + "</span>" +
          '<span style="font-size:1.05em;margin-right:1px;">&radic;</span>' +
          '<span style="border-top:1.5px solid black;padding-top:1px;">' + mathTextToHTML(content) + "</span></span>";
        i = next;
        continue;
      }
      out += esc(text[i]); i++; continue;
    }
    if (text.startsWith("sqrt{", i)) {
      const [content, next] = readBraced(text, i + 4);
      out += '<span style="display:inline-flex;align-items:flex-start;">' +
        '<span style="font-size:1.05em;margin-right:1px;">&radic;</span>' +
        '<span style="border-top:1.5px solid black;padding-top:1px;">' + mathTextToHTML(content) + "</span></span>";
      i = next;
      continue;
    }
    if (text.startsWith("frac{", i)) {
      const [num, afterNum] = readBraced(text, i + 4);
      if (text[afterNum] === "{") {
        const [den, afterDen] = readBraced(text, afterNum);
        out += '<span style="display:inline-table;vertical-align:middle;text-align:center;line-height:1.2;">' +
          '<span style="display:table-row;"><span style="display:table-cell;border-bottom:1.5px solid black;padding:0 4px 2px;">' + mathTextToHTML(num) + "</span></span>" +
          '<span style="display:table-row;"><span style="display:table-cell;padding:2px 4px 0;">' + mathTextToHTML(den) + "</span></span></span>";
        i = afterDen;
        continue;
      }
      out += esc(text[i]); i++; continue;
    }
    if (text[i] === "^" && text[i + 1] === "{") {
      const [content, next] = readBraced(text, i + 1);
      out += "<sup>" + mathTextToHTML(content) + "</sup>";
      i = next;
      continue;
    }
    if (text[i] === "_" && text[i + 1] === "{") {
      const [content, next] = readBraced(text, i + 1);
      out += "<sub>" + mathTextToHTML(content) + "</sub>";
      i = next;
      continue;
    }
    if (text[i] === "^" && /[A-Za-z0-9-]/.test(text[i + 1] || "")) {
      const m = simpleTokenRe.exec(text.slice(i + 1));
      if (m) { out += "<sup>" + esc(m[0]) + "</sup>"; i = i + 1 + m[0].length; continue; }
    }
    if (text[i] === "_" && /[A-Za-z0-9-]/.test(text[i + 1] || "")) {
      const m = simpleTokenRe.exec(text.slice(i + 1));
      if (m) { out += "<sub>" + esc(m[0]) + "</sub>"; i = i + 1 + m[0].length; continue; }
    }
    {
      const markers = ["sqrt[", "sqrt{", "frac{"];
      let next = text.length;
      markers.forEach((m) => {
        const idx = text.indexOf(m, i);
        if (idx !== -1) next = Math.min(next, idx);
      });
      for (let j = i; j < text.length; j++) {
        if (text[j] === "^" || text[j] === "_") { next = Math.min(next, j); break; }
      }
      if (next === i) { out += esc(text[i]); i++; } else { out += esc(text.slice(i, next)); i = next; }
    }
  }
  return out;
}

/* ---------------- Minimal ZIP writer (store method, no library) ---------------- */
const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(bytes) {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    crc = CRC_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function strToBytes(str) {
  return new TextEncoder().encode(str);
}

function dosDateTime() {
  // Fixed, valid date; exact value doesn't matter for import correctness.
  return { time: 0, date: 0x21 };
}

function writeUint32LE(arr, offset, value) {
  arr[offset] = value & 0xff;
  arr[offset + 1] = (value >>> 8) & 0xff;
  arr[offset + 2] = (value >>> 16) & 0xff;
  arr[offset + 3] = (value >>> 24) & 0xff;
}
function writeUint16LE(arr, offset, value) {
  arr[offset] = value & 0xff;
  arr[offset + 1] = (value >>> 8) & 0xff;
}

function createZip(files) {
  // files: [{ name: "imsmanifest.xml", content: "..." }]
  const { time, date } = dosDateTime();
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  files.forEach((f) => {
    const nameBytes = strToBytes(f.name);
    const dataBytes = strToBytes(f.content);
    const crc = crc32(dataBytes);
    const size = dataBytes.length;

    const local = new Uint8Array(30 + nameBytes.length);
    writeUint32LE(local, 0, 0x04034b50);
    writeUint16LE(local, 4, 20);
    writeUint16LE(local, 6, 0);
    writeUint16LE(local, 8, 0); // store, no compression
    writeUint16LE(local, 10, time);
    writeUint16LE(local, 12, date);
    writeUint32LE(local, 14, crc);
    writeUint32LE(local, 18, size);
    writeUint32LE(local, 22, size);
    writeUint16LE(local, 26, nameBytes.length);
    writeUint16LE(local, 28, 0);
    local.set(nameBytes, 30);

    localParts.push(local, dataBytes);

    const central = new Uint8Array(46 + nameBytes.length);
    writeUint32LE(central, 0, 0x02014b50);
    writeUint16LE(central, 4, 20);
    writeUint16LE(central, 6, 20);
    writeUint16LE(central, 8, 0);
    writeUint16LE(central, 10, 0);
    writeUint16LE(central, 12, time);
    writeUint16LE(central, 14, date);
    writeUint32LE(central, 16, crc);
    writeUint32LE(central, 20, size);
    writeUint32LE(central, 24, size);
    writeUint16LE(central, 28, nameBytes.length);
    writeUint16LE(central, 30, 0);
    writeUint16LE(central, 32, 0);
    writeUint16LE(central, 34, 0);
    writeUint16LE(central, 36, 0);
    writeUint32LE(central, 38, 0);
    writeUint32LE(central, 42, offset);
    central.set(nameBytes, 46);

    centralParts.push(central);
    offset += local.length + dataBytes.length;
  });

  const centralStart = offset;
  let centralSize = 0;
  centralParts.forEach((c) => (centralSize += c.length));

  const end = new Uint8Array(22);
  writeUint32LE(end, 0, 0x06054b50);
  writeUint16LE(end, 4, 0);
  writeUint16LE(end, 6, 0);
  writeUint16LE(end, 8, files.length);
  writeUint16LE(end, 10, files.length);
  writeUint32LE(end, 12, centralSize);
  writeUint32LE(end, 16, centralStart);
  writeUint16LE(end, 20, 0);

  const totalSize = offset + centralSize + end.length;
  const out = new Uint8Array(totalSize);
  let pos = 0;
  [...localParts, ...centralParts, end].forEach((part) => {
    out.set(part, pos);
    pos += part.length;
  });
  return out;
}

/* ---------------- QTI 1.2 package generation (Canvas classic quiz import) ---------------- */
function xmlEscape(str) {
  return String(str == null ? "" : str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function qtiMeta(type, points) {
  return `<itemmetadata><qtimetadata>
    <qtimetadatafield><fieldlabel>question_type</fieldlabel><fieldentry>${type}</fieldentry></qtimetadatafield>
    <qtimetadatafield><fieldlabel>points_possible</fieldlabel><fieldentry>${points}</fieldentry></qtimetadatafield>
  </qtimetadata></itemmetadata>`;
}

function qtiMaterial(text) {
  if (containsMathNotation(text)) {
    return `<material><mattext texttype="text/html"><![CDATA[${mathTextToHTML(text)}]]></mattext></material>`;
  }
  return `<material><mattext texttype="text/plain">${xmlEscape(text)}</mattext></material>`;
}

function qtiMultipleChoice(id, stem, options, correctId, points) {
  const labels = (options || [])
    .map((o) => `<response_label ident="${xmlEscape(o.id)}">${qtiMaterial(o.text)}</response_label>`)
    .join("\n");
  return `<item ident="${id}" title="${id}">
  ${qtiMeta("multiple_choice_question", points)}
  <presentation>
    ${qtiMaterial(stem)}
    <response_lid ident="response1" rcardinality="Single">
      <render_choice>${labels}</render_choice>
    </response_lid>
  </presentation>
  <resprocessing>
    <outcomes><decvar maxvalue="100" minvalue="0" varname="SCORE" vartype="Decimal"/></outcomes>
    <respcondition continue="No">
      <conditionvar><varequal respident="response1">${xmlEscape(correctId)}</varequal></conditionvar>
      <setvar action="Set" varname="SCORE">100</setvar>
    </respcondition>
  </resprocessing>
</item>`;
}

function qtiMultipleAnswer(id, stem, options, correctIds, points) {
  const labels = (options || [])
    .map((o) => `<response_label ident="${xmlEscape(o.id)}">${qtiMaterial(o.text)}</response_label>`)
    .join("\n");
  const correctSet = new Set(correctIds || []);
  const conditions = (options || [])
    .map((o) => (correctSet.has(o.id)
      ? `<varequal respident="response1">${xmlEscape(o.id)}</varequal>`
      : `<not><varequal respident="response1">${xmlEscape(o.id)}</varequal></not>`))
    .join("\n");
  return `<item ident="${id}" title="${id}">
  ${qtiMeta("multiple_answers_question", points)}
  <presentation>
    ${qtiMaterial(stem)}
    <response_lid ident="response1" rcardinality="Multiple">
      <render_choice>${labels}</render_choice>
    </response_lid>
  </presentation>
  <resprocessing>
    <outcomes><decvar maxvalue="100" minvalue="0" varname="SCORE" vartype="Decimal"/></outcomes>
    <respcondition continue="No">
      <conditionvar><and>${conditions}</and></conditionvar>
      <setvar action="Set" varname="SCORE">100</setvar>
    </respcondition>
  </resprocessing>
</item>`;
}

function qtiNumericOrShort(id, stem, answerRaw, points) {
  const plain = mathTextToPlain(String(answerRaw ?? "").trim());
  const num = Number(plain.replace(/,/g, ""));
  if (plain !== "" && !isNaN(num)) {
    return `<item ident="${id}" title="${id}">
  ${qtiMeta("numerical_question", points)}
  <presentation>
    ${qtiMaterial(stem)}
    <response_num ident="response1" rcardinality="Single">
      <render_fib><response_label ident="answer1"/></render_fib>
    </response_num>
  </presentation>
  <resprocessing>
    <outcomes><decvar maxvalue="100" minvalue="0" varname="SCORE" vartype="Decimal"/></outcomes>
    <respcondition continue="No">
      <conditionvar><varequal respident="response1">${num}</varequal></conditionvar>
      <setvar action="Set" varname="SCORE">100</setvar>
    </respcondition>
  </resprocessing>
</item>`;
  }
  return `<item ident="${id}" title="${id}">
  ${qtiMeta("short_answer_question", points)}
  <presentation>
    ${qtiMaterial(stem)}
    <response_str ident="response1" rcardinality="Single">
      <render_fib><response_label ident="answer1"/></render_fib>
    </response_str>
  </presentation>
  <resprocessing>
    <outcomes><decvar maxvalue="100" minvalue="0" varname="SCORE" vartype="Decimal"/></outcomes>
    <respcondition continue="No">
      <conditionvar><varequal respident="response1">${xmlEscape(plain)}</varequal></conditionvar>
      <setvar action="Set" varname="SCORE">100</setvar>
    </respcondition>
  </resprocessing>
</item>`;
}

function qtiMatching(id, stem, rows, columns, correct, points) {
  const perRow = points / Math.max(1, (rows || []).length);
  const responses = (rows || [])
    .map((r, ri) => {
      const labels = (columns || [])
        .map((c, ci) => `<response_label ident="c${ci}">${qtiMaterial(c)}</response_label>`)
        .join("\n");
      return `<response_lid ident="response${ri}" rcardinality="Single">
        ${qtiMaterial(r)}
        <render_choice>${labels}</render_choice>
      </response_lid>`;
    })
    .join("\n");
  const conditions = (rows || [])
    .map((r, ri) => `<respcondition continue="Yes">
      <conditionvar><varequal respident="response${ri}">c${(correct || [])[ri]}</varequal></conditionvar>
      <setvar action="Add" varname="SCORE">${(100 / Math.max(1, (rows || []).length)).toFixed(2)}</setvar>
    </respcondition>`)
    .join("\n");
  return `<item ident="${id}" title="${id}">
  ${qtiMeta("matching_question", points)}
  <presentation>
    ${qtiMaterial(stem)}
    ${responses}
  </presentation>
  <resprocessing>
    <outcomes><decvar maxvalue="100" minvalue="0" varname="SCORE" vartype="Decimal"/></outcomes>
    ${conditions}
  </resprocessing>
</item>`;
}

function qtiEssay(id, stem, points) {
  return `<item ident="${id}" title="${id}">
  ${qtiMeta("essay_question", points)}
  <presentation>
    ${qtiMaterial(stem)}
    <response_str ident="response1" rcardinality="Single">
      <render_fib rows="6" columns="60"><response_label ident="answer1"/></render_fib>
    </response_str>
  </presentation>
</item>`;
}

function itemToQTI(id, type, stem, data, points) {
  switch (type) {
    case "multiple_choice":
      return qtiMultipleChoice(id, stem, data.options, data.correctId, points);
    case "multi_select":
      return qtiMultipleAnswer(id, stem, data.options, data.correctIds, points);
    case "equation_numeric":
      return qtiNumericOrShort(id, stem, data.correctAnswer, points);
    case "matching_tables":
      return qtiMatching(id, stem, data.rows, data.columns, data.correct, points);
    case "drag_and_drop":
      return qtiEssay(id, stem + " (fill in the blank)", points);
    case "hot_spot":
      return qtiEssay(id, stem, points);
    case "graphing":
      return qtiEssay(id, stem + " (student should describe or sketch the graph)", points);
    case "fill_in_table":
      return qtiEssay(id, stem + " (complete the table)", points);
    case "extended_response":
      return qtiEssay(id, stem, points);
    default:
      return qtiEssay(id, stem, points);
  }
}

function qtiTextOnly(id, html) {
  return `<item ident="${id}" title="${id}">
  <itemmetadata><qtimetadata>
    <qtimetadatafield><fieldlabel>question_type</fieldlabel><fieldentry>text_only_question</fieldentry></qtimetadatafield>
  </qtimetadata></itemmetadata>
  <presentation>
    <material><mattext texttype="text/html"><![CDATA[${html}]]></mattext></material>
  </presentation>
</item>`;
}

function stimulusToHTML(stimulus) {
  if (!stimulus) return "";
  const narrative = typeof stimulus === "string" ? stimulus : stimulus.narrative;
  let html = "";
  if (narrative) html += `<p>${mathTextToHTML(narrative)}</p>`;
  if (stimulus.table && stimulus.table.headers) {
    html += '<table style="border-collapse:collapse;margin:10px 0;">';
    html += "<tr>" + stimulus.table.headers.map((h) => `<th style="border:1px solid #999;padding:6px 10px;background:#f2f2f2;">${mathTextToHTML(String(h))}</th>`).join("") + "</tr>";
    (stimulus.table.rows || []).forEach((row) => {
      html += "<tr>" + row.map((cell) => `<td style="border:1px solid #999;padding:6px 10px;">${mathTextToHTML(String(cell))}</td>`).join("") + "</tr>";
    });
    html += "</table>";
  }
  if (stimulus.graph) {
    html += '<p style="font-style:italic;color:#555;">(This task includes a graph that could not be transferred into Canvas. See the printed or Word version of this task for the graph.)</p>';
  }
  return html;
}

function buildQTIPackage(title, items, stimulus) {
  // items: [{ type, stem, data }]
  const safeTitle = (title || "Quiz").replace(/[^a-zA-Z0-9 _-]/g, "").trim() || "Quiz";
  const quizId = "quiz_" + Date.now();
  const stimulusHtml = stimulusToHTML(stimulus);
  const stimulusItemXml = stimulusHtml ? qtiTextOnly(`${quizId}_stimulus`, stimulusHtml) + "\n" : "";
  const itemXml = items
    .map((it, i) => itemToQTI(`${quizId}_item_${i + 1}`, it.type, it.stem, it.data || {}, 1))
    .join("\n");

  const assessmentXml = `<?xml version="1.0" encoding="UTF-8"?>
<questestinterop xmlns="http://www.imsglobal.org/xsd/ims_qtiasiv1p2">
  <assessment ident="${quizId}" title="${xmlEscape(safeTitle)}">
    <section ident="root_section">
${stimulusItemXml}${itemXml}
    </section>
  </assessment>
</questestinterop>`;

  const manifestXml = `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="${quizId}_manifest" xmlns="http://www.imsglobal.org/xsd/imscp_v1p1">
  <organizations/>
  <resources>
    <resource identifier="${quizId}" type="imsqti_xmlv1p2" href="${quizId}/${quizId}.xml">
      <file href="${quizId}/${quizId}.xml"/>
    </resource>
  </resources>
</manifest>`;

  return createZip([
    { name: "imsmanifest.xml", content: manifestXml },
    { name: `${quizId}/${quizId}.xml`, content: assessmentXml },
  ]);
}

function downloadQTI(title, items, stimulus) {
  const zipBytes = buildQTIPackage(title, items, stimulus);
  const base64 = arrayBufferToBase64(zipBytes.buffer);
  const dataUri = "data:application/zip;base64," + base64;
  const filename = (title || "quiz").replace(/[^a-zA-Z0-9 _-]/g, "").trim().replace(/\s+/g, "_") + "_QTI.zip";
  const a = document.createElement("a");
  a.href = dataUri;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export {
  C, ITEM_TYPES, TYPE_MAP, SCHEMA_NOTE,
  callClaude,
  readAsText, readAsArrayBuffer, arrayBufferToBase64, extractTextFromDocx, splitFromPDF,
  splitByNumbering, splitWithAI,
  typesBlock, normalizeGroups, convertAll, convertOne,
  OptionsList, MatchingTables, EquationNumeric, DragAndDrop, HotSpot, Graphing, FillInTable,
  ItemVisual, Radical, Fraction, renderMathText, DataTable, downloadQTI,
};
