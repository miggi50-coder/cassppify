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
  { id: "matching_tables", label: "Matching Tables", desc: "Match each row to the correct category in a grid. The rows and columns hold the actual content, not the stem." },
  { id: "equation_numeric", label: "Equation / Numeric", desc: "Student enters a value or expression directly, no options." },
  { id: "drag_and_drop", label: "Drag and Drop", desc: "Student places the correct tile into a blank or target." },
  { id: "hot_spot", label: "Hot Spot", desc: "Student marks the correct point, region, or object." },
  { id: "graphing", label: "Graphing", desc: "Student plots points or a line on a coordinate grid." },
  { id: "fill_in_table", label: "Fill In Table", desc: "Student completes missing values in a table." },
];
const TYPE_MAP = Object.fromEntries(ITEM_TYPES.map((t) => [t.id, t]));

const SCHEMA_NOTE = `
Return ONLY valid JSON, no markdown fences, no commentary. The JSON must be strictly valid: every double quote, backslash, and line break that appears inside a string value must be properly escaped. If you need to quote a term or phrase within a string value, use single quotes or apostrophes instead of double quotes, so you never need to escape a quote mark inside a string. Do not put a real line break inside a string value, use \\n instead if a line break is genuinely needed.

Use exactly this shape for each item's "data" field, matching its type:

multiple_choice: { "options": [{"id":"A","text":"..."}, ...], "correctId": "B" }
multi_select: { "options": [{"id":"A","text":"..."}, ...], "correctIds": ["B","C"] }
matching_tables: { "rows": ["row label 1","row label 2","row label 3"], "columns": ["col A","col B"], "correct": [0,1,0] }

For matching_tables specifically: "stem" must be ONLY a short one or two sentence instruction, for example "Determine whether each expression is a polynomial in standard form." Never write the actual statements, expressions, or category descriptions as prose inside "stem". Every statement or expression being matched belongs in its own entry in the "rows" array, one per row, and every category belongs in the "columns" array as a short label of a few words, not a full sentence. If a category genuinely needs a longer description to be clear, shorten it to a few words for the column header and put the fuller explanation in "stem" once, not repeated per row.
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

Every exponent and every subscript needs an explicit marker, never a bare digit stuck directly onto a letter with nothing between them. Never write x2 meaning x squared or meaning a coordinate label x sub 2, that is ambiguous and unreadable either way. For an exponent, write at minimum x^2 (or x^{2} for anything more complex). For a subscript, write at minimum x_2 (or x_{2} for anything more complex), for example when labeling coordinates like (x_1, y_1) and (x_2, y_2) in a slope or distance formula. This applies everywhere, including inside the "rows" and "columns" of a matching_tables item, not just in "stem".
`.trim();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 529 (Anthropic's own "Overloaded" signal) and the common 5xx codes are
// transient server-side conditions, not something wrong with the request.
// A short wait and retry resolves these most of the time.
const TRANSIENT_STATUS = new Set([500, 502, 503, 504, 529]);

async function callClaude(content, { maxTokens = 4000 } = {}) {
  const maxAttempts = 3;
  let lastErr;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await callClaudeOnce(content, maxTokens);
    } catch (e) {
      lastErr = e;
      const isParseFailure = String(e.message || "").startsWith("Could not parse");
      const isTransient = e.transient === true;
      if ((isParseFailure || isTransient) && attempt < maxAttempts) {
        if (isTransient) await sleep(attempt * 1500); // 1.5s, then 3s
        continue;
      }
      if (isTransient) {
        throw new Error("Claude's servers are still busy after a few tries. Please wait a minute and try again.");
      }
      throw e;
    }
  }
  throw lastErr;
}

async function callClaudeOnce(content, maxTokens) {
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
    if (TRANSIENT_STATUS.has(resp.status)) {
      const err = new Error("Claude's servers are temporarily overloaded. Retrying automatically...");
      err.transient = true;
      throw err;
    }
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
  const jsonSlice = cleaned.slice(start, end + 1);
  try {
    return JSON.parse(jsonSlice);
  } catch (e) {
    // The model occasionally puts a real line break inside a text field
    // (a long stem or sample response) instead of an escaped \n, which is
    // invalid JSON. Walk the string tracking quote/escape state and fix
    // raw control characters only when they're actually inside a string.
    try {
      return JSON.parse(sanitizeJSONControlChars(jsonSlice));
    } catch (e2) {
      throw new Error("Could not parse the response: " + e2.message);
    }
  }
}

function sanitizeJSONControlChars(str) {
  let out = "";
  let inString = false;
  let escaped = false;
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (inString) {
      if (escaped) {
        out += ch;
        escaped = false;
        continue;
      }
      if (ch === "\\") {
        out += ch;
        escaped = true;
        continue;
      }
      if (ch === '"') {
        out += ch;
        inString = false;
        continue;
      }
      if (ch === "\n") { out += "\\n"; continue; }
      if (ch === "\r") { out += "\\r"; continue; }
      if (ch === "\t") { out += "\\t"; continue; }
      out += ch;
    } else {
      if (ch === '"') inString = true;
      out += ch;
    }
  }
  return out;
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
  // Table-cell layout instead of flex + position:relative, since the manual
  // pixel-nudge (position:relative; top:-0.4em) that used to position the
  // index rendered inconsistently across browser engines -- table-cell
  // vertical-align is much older and more predictably supported, and is the
  // same technique already used reliably for the Fraction component.
  //
  // When there's an index (an nth root), the left margin is wider than the
  // no-index case: without it, a coefficient written right before the
  // radical (like "2sqrt[3]{x}") sits flush against the small index digit,
  // and "2" next to "3" reads ambiguously like "23". The extra gap makes it
  // unambiguously read as "2" times "the cube root of x".
  return (
    <span style={{ display: "inline-flex", alignItems: "flex-start", margin: index ? "0 1px 0 4px" : "0 1px" }}>
      {index && (
        <span style={{ display: "inline-table", verticalAlign: "bottom", marginRight: 1 }}>
          <span style={{ display: "table-row" }}>
            <span style={{ display: "table-cell", fontSize: "0.6em", verticalAlign: "bottom", lineHeight: 1, paddingRight: 1 }}>{index}</span>
            <span style={{ display: "table-cell", fontSize: "1.05em", verticalAlign: "bottom", lineHeight: 1 }}>{"\u221A"}</span>
          </span>
        </span>
      )}
      {!index && (
        <span style={{ fontSize: "1.05em", lineHeight: 1, marginRight: 1, transform: "translateY(1px)" }}>{"\u221A"}</span>
      )}
      <span style={{ borderTop: "1.5px solid currentColor", paddingTop: 1 }}>{children}</span>
    </span>
  );
}

// Explicit font-size scale instead of relying on the browser's default
// <sup>/<sub> "smaller" keyword, which is inconsistent across engines and,
// critically, doesn't compound predictably when the content is a nested
// Fraction (which sets its own font-size). Without this, a fractional
// exponent like x^{frac{2}{3}} barely shrinks at all and ends up looking
// almost the same size as the main equation instead of a proper exponent.
function Sup({ children }) {
  return <sup style={{ fontSize: "0.7em", lineHeight: 1 }}>{children}</sup>;
}
function Sub({ children }) {
  return <sub style={{ fontSize: "0.7em", lineHeight: 1 }}>{children}</sub>;
}

function Fraction({ numerator, denominator, compact }) {
  const fontSize = compact ? "0.8em" : "0.95em";
  const numPad = compact ? "0 2px 1px" : "0 4px 2px";
  const denPad = compact ? "1px 2px 0" : "2px 4px 0";
  const lineHeight = compact ? 1.05 : 1.2;
  return (
    <span style={{ display: "inline-table", verticalAlign: "middle", margin: "0 3px", textAlign: "center", lineHeight, fontSize }}>
      <span style={{ display: "table-row" }}>
        <span style={{ display: "table-cell", padding: numPad, borderBottom: "1.5px solid currentColor" }}>{numerator}</span>
      </span>
      <span style={{ display: "table-row" }}>
        <span style={{ display: "table-cell", padding: denPad }}>{denominator}</span>
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

function renderMathText(text, compact = false) {
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
        parts.push(<Radical key={key++} index={indexStr}>{renderMathText(content, compact)}</Radical>);
        i = next;
        continue;
      }
      parts.push(text[i]); i++; continue;
    }
    if (text.startsWith("sqrt{", i)) {
      const [content, next] = readBraced(text, i + 4);
      parts.push(<Radical key={key++}>{renderMathText(content, compact)}</Radical>);
      i = next;
      continue;
    }
    if (text.startsWith("frac{", i)) {
      const [num, afterNum] = readBraced(text, i + 4);
      if (text[afterNum] === "{") {
        const [den, afterDen] = readBraced(text, afterNum);
        parts.push(<Fraction key={key++} numerator={renderMathText(num, compact)} denominator={renderMathText(den, compact)} compact={compact} />);
        i = afterDen;
        continue;
      }
      parts.push(text[i]); i++; continue;
    }
    if (text[i] === "^" && text[i + 1] === "{") {
      const [content, next] = readBraced(text, i + 1);
      parts.push(<Sup key={key++}>{renderMathText(content, true)}</Sup>);
      i = next;
      continue;
    }
    if (text[i] === "_" && text[i + 1] === "{") {
      const [content, next] = readBraced(text, i + 1);
      parts.push(<Sub key={key++}>{renderMathText(content, true)}</Sub>);
      i = next;
      continue;
    }
    if (text[i] === "^" && /[A-Za-z0-9-]/.test(text[i + 1] || "")) {
      const m = simpleTokenRe.exec(text.slice(i + 1));
      if (m) {
        parts.push(<Sup key={key++}>{m[0]}</Sup>);
        i = i + 1 + m[0].length;
        continue;
      }
    }
    if (text[i] === "_" && /[A-Za-z0-9-]/.test(text[i + 1] || "")) {
      const m = simpleTokenRe.exec(text.slice(i + 1));
      if (m) {
        parts.push(<Sub key={key++}>{m[0]}</Sub>);
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

// ---------------- MathML generation for QTI/Canvas export ----------------
// Canvas's own math editor converts LaTeX to MathML and renders it with
// MathJax -- the same rendering engine used across Canvas, including New
// Quizzes. MathJax typesets MathML with its own internal layout engine,
// completely independent of the surrounding page's CSS, which is exactly
// what kept breaking hand-rolled nested HTML (Canvas's own CSS clipping it)
// and hand-rolled inline images (Canvas's sanitizer stripping data: URIs).
// Verified against the real mathjax-full npm package (the actual library
// Canvas uses), not assumed -- see the conversation history for the render
// tests this was checked against.
// Converts our internal notation (frac{}/sqrt[n]{}/^{}/_{}) into proper
// MathML markup, so Canvas's own MathJax engine handles the actual visual
// rendering instead of us guessing at CSS that Canvas's surrounding page
// might clip or strip. Built as a proper node tree (matching the SVG
// engine's approach) rather than string markers + regex, so a sup/sub
// always attaches to exactly the token it followed, by construction.

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

function escXml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ---- Tokenize a plain-text run into individual MathML leaf tokens ----
function tokenizePlainNodes(str) {
  const nodes = [];
  let i = 0;
  while (i < str.length) {
    const ch = str[i];
    if (/\s/.test(ch)) { i++; continue; }
    if (/[0-9.]/.test(ch)) {
      const m = /^[0-9]+(\.[0-9]+)?/.exec(str.slice(i));
      nodes.push({ t: "mn", s: m[0] });
      i += m[0].length;
      continue;
    }
    if (/[A-Za-z]/.test(ch)) {
      const m = /^[A-Za-z]+/.exec(str.slice(i));
      nodes.push({ t: "mi", s: m[0] });
      i += m[0].length;
      continue;
    }
    if ("+-=<>".includes(ch)) {
      let op = ch;
      if (ch === "<" && str[i + 1] === "=") { op = "\u2264"; i++; }
      if (ch === ">" && str[i + 1] === "=") { op = "\u2265"; i++; }
      nodes.push({ t: "mo", s: op });
      i++;
      continue;
    }
    if (ch === "(" || ch === ")") { nodes.push({ t: "mo", s: ch }); i++; continue; }
    nodes.push({ t: "mtext", s: ch });
    i++;
  }
  return nodes;
}

// ---- Parse "frac{}/sqrt[n]{}/^{}/_{}" notation into a node tree ----
// Node types: {t:"mn"/"mi"/"mo"/"mtext", s}, {t:"frac", num, den},
// {t:"sqrt", index, content}, {t:"sup"/"sub", base, exp} (base is the
// single preceding node this attaches to).
function parse(str) {
  const flat = [];
  let i = 0;
  while (i < str.length) {
    if (str.startsWith("sqrt[", i)) {
      const closeBracket = str.indexOf("]", i);
      if (closeBracket !== -1 && str[closeBracket + 1] === "{") {
        const idxStr = str.slice(i + 5, closeBracket);
        const [content, next] = readBraced(str, closeBracket + 1);
        flat.push({ t: "sqrt", index: idxStr, content: parse(content) });
        i = next;
        continue;
      }
    }
    if (str.startsWith("sqrt{", i)) {
      const [content, next] = readBraced(str, i + 4);
      flat.push({ t: "sqrt", index: null, content: parse(content) });
      i = next;
      continue;
    }
    if (str.startsWith("frac{", i)) {
      const [num, afterNum] = readBraced(str, i + 4);
      if (str[afterNum] === "{") {
        const [den, afterDen] = readBraced(str, afterNum);
        flat.push({ t: "frac", num: parse(num), den: parse(den) });
        i = afterDen;
        continue;
      }
    }
    if (str[i] === "^" && str[i + 1] === "{") {
      const [content, next] = readBraced(str, i + 1);
      const base = flat.pop() || { t: "mtext", s: "" };
      flat.push({ t: "sup", base, exp: parse(content) });
      i = next;
      continue;
    }
    if (str[i] === "_" && str[i + 1] === "{") {
      const [content, next] = readBraced(str, i + 1);
      const base = flat.pop() || { t: "mtext", s: "" };
      flat.push({ t: "sub", base, exp: parse(content) });
      i = next;
      continue;
    }
    if (str[i] === "^" && /[A-Za-z0-9-]/.test(str[i + 1] || "")) {
      const m = simpleTokenRe.exec(str.slice(i + 1));
      if (m) {
        const base = flat.pop() || { t: "mtext", s: "" };
        flat.push({ t: "sup", base, exp: tokenizePlainNodes(m[0]) });
        i = i + 1 + m[0].length;
        continue;
      }
    }
    if (str[i] === "_" && /[A-Za-z0-9-]/.test(str[i + 1] || "")) {
      const m = simpleTokenRe.exec(str.slice(i + 1));
      if (m) {
        const base = flat.pop() || { t: "mtext", s: "" };
        flat.push({ t: "sub", base, exp: tokenizePlainNodes(m[0]) });
        i = i + 1 + m[0].length;
        continue;
      }
    }
    const markers = ["sqrt[", "sqrt{", "frac{"];
    let next = str.length;
    markers.forEach((m) => { const idx = str.indexOf(m, i); if (idx !== -1) next = Math.min(next, idx); });
    for (let j = i; j < str.length; j++) { if (str[j] === "^" || str[j] === "_") { next = Math.min(next, j); break; } }
    const chunk = next === i ? str[i] : str.slice(i, next);
    flat.push(...tokenizePlainNodes(chunk));
    i = next === i ? i + 1 : next;
  }
  return flat;
}

// ---- Render a node tree to a MathML string ----
function renderNodes(nodes) {
  return nodes.map(renderNode).join("");
}
function renderNode(node) {
  if (node.t === "mn" || node.t === "mi" || node.t === "mo" || node.t === "mtext") {
    return `<${node.t}>${escXml(node.s)}</${node.t}>`;
  }
  if (node.t === "frac") {
    return `<mfrac><mrow>${renderNodes(node.num)}</mrow><mrow>${renderNodes(node.den)}</mrow></mfrac>`;
  }
  if (node.t === "sqrt") {
    if (node.index) {
      return `<mroot><mrow>${renderNodes(node.content)}</mrow><mn>${escXml(node.index)}</mn></mroot>`;
    }
    return `<msqrt><mrow>${renderNodes(node.content)}</mrow></msqrt>`;
  }
  if (node.t === "sup") {
    return `<msup><mrow>${renderNode(node.base)}</mrow><mrow>${renderNodes(node.exp)}</mrow></msup>`;
  }
  if (node.t === "sub") {
    return `<msub><mrow>${renderNode(node.base)}</mrow><mrow>${renderNodes(node.exp)}</mrow></msub>`;
  }
  return "";
}

function buildMathMLBlock(text) {
  const nodes = parse(text);
  return `<math xmlns="http://www.w3.org/1998/Math/MathML">${renderNodes(nodes)}</math>`;
}


// Turns our internal notation into MathML wrapped in HTML, mixed with plain
// text for any surrounding prose (a stem's sentence, for example). Pure-math
// strings (answer options, which are never mixed with English words) become
// one <math> block; sentences get only their math sub-expressions wrapped,
// so prose doesn't get accidentally italicized as if it were a variable.
function looksLikePureMath(text) {
  let depth = 0;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === "{") depth++;
    else if (text[i] === "}") depth--;
    else if (text[i] === " " && depth === 0) return false;
  }
  return true;
}

function mathTextToMathHTML(text) {
  if (!text || typeof text !== "string") return "";
  text = cleanStrayLatex(text);
  if (!containsMathNotation(text)) return xmlEscape(text);

  if (looksLikePureMath(text)) {
    return buildMathMLBlock(text);
  }

  // Mixed content: walk the text, and whenever a math construct is found,
  // emit a small self-contained <math> island for it (including the base
  // token immediately before a ^ or _, the same way a person would read
  // "x^2" as one unit) while everything else stays plain escaped text.
  function readBracedTop(str, openBraceIdx) {
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
  const baseTokenRe = /[A-Za-z0-9]$/;
  const simpleExpRe = /^-?[A-Za-z0-9]+/;

  let out = "";
  let plainBuffer = "";
  let i = 0;
  function flushPlain() {
    if (plainBuffer) { out += xmlEscape(plainBuffer); plainBuffer = ""; }
  }
  while (i < text.length) {
    if (text.startsWith("sqrt[", i) || text.startsWith("sqrt{", i) || text.startsWith("frac{", i)) {
      flushPlain();
      const start = i;
      if (text.startsWith("sqrt[", i)) {
        const closeBracket = text.indexOf("]", i);
        const [, next] = readBracedTop(text, closeBracket + 1);
        i = next;
      } else if (text.startsWith("sqrt{", i)) {
        const [, next] = readBracedTop(text, i + 4);
        i = next;
      } else {
        const [, afterNum] = readBracedTop(text, i + 4);
        const [, afterDen] = readBracedTop(text, afterNum);
        i = afterDen;
      }
      out += buildMathMLBlock(text.slice(start, i));
      continue;
    }
    if ((text[i] === "^" || text[i] === "_") && (text[i + 1] === "{" || /[A-Za-z0-9-]/.test(text[i + 1] || ""))) {
      // Pull the base token off the end of the plain-text buffer so it
      // becomes part of the same math island as the exponent/subscript.
      const baseMatch = /[A-Za-z0-9]+$/.exec(plainBuffer);
      const base = baseMatch ? baseMatch[0] : "";
      plainBuffer = base ? plainBuffer.slice(0, -base.length) : plainBuffer;
      flushPlain();
      let exprEnd;
      if (text[i + 1] === "{") {
        const [, next] = readBracedTop(text, i + 1);
        exprEnd = next;
      } else {
        const m = simpleExpRe.exec(text.slice(i + 1));
        exprEnd = i + 1 + (m ? m[0].length : 1);
      }
      out += buildMathMLBlock(base + text.slice(i, exprEnd));
      i = exprEnd;
      continue;
    }
    plainBuffer += text[i];
    i++;
  }
  flushPlain();
  return out;
}

function mathTextToHTML(text, compact) {
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

  // Matches the live app's Fraction rendering exactly: a normal fraction at
  // the top level, or a smaller "compact" one when nested inside an
  // exponent, where a full-size two-row fraction would look oversized and,
  // in Canvas specifically, can get clipped by the exponent's line box.
  function fractionHTML(numHTML, denHTML, isCompact) {
    const fontSize = isCompact ? "0.8em" : "0.95em";
    const numPad = isCompact ? "0 2px 1px" : "0 4px 2px";
    const denPad = isCompact ? "1px 2px 0" : "2px 4px 0";
    const lineHeight = isCompact ? "1.05" : "1.2";
    return '<span style="display:inline-table;vertical-align:middle;margin:0 3px;text-align:center;line-height:' + lineHeight + ';font-size:' + fontSize + ';">' +
      '<span style="display:table-row;"><span style="display:table-cell;padding:' + numPad + ';border-bottom:1.5px solid currentColor;">' + numHTML + '</span></span>' +
      '<span style="display:table-row;"><span style="display:table-cell;padding:' + denPad + ';">' + denHTML + '</span></span></span>';
  }

  let out = "";
  let i = 0;
  while (i < text.length) {
    if (text.startsWith("sqrt[", i)) {
      const closeBracket = text.indexOf("]", i);
      if (closeBracket !== -1 && text[closeBracket + 1] === "{") {
        const indexStr = text.slice(i + 5, closeBracket);
        const [content, next] = readBraced(text, closeBracket + 1);
        // Table-cell layout, not position:relative -- the old hack is
        // exactly what made the index float away from the radical sign.
        // Extra left margin so a preceding coefficient (like "2sqrt[3]{x}")
        // doesn't crowd right up against the small index digit.
        out += '<span style="display:inline-flex;align-items:flex-start;margin:0 1px 0 4px;">' +
          '<span style="display:inline-table;vertical-align:bottom;margin-right:1px;">' +
          '<span style="display:table-row;">' +
          '<span style="display:table-cell;font-size:0.6em;vertical-align:bottom;line-height:1;padding-right:1px;">' + esc(indexStr) + '</span>' +
          '<span style="display:table-cell;font-size:1.05em;vertical-align:bottom;line-height:1;">&radic;</span>' +
          '</span></span>' +
          '<span style="border-top:1.5px solid currentColor;padding-top:1px;">' + mathTextToHTML(content, compact) + '</span></span>';
        i = next;
        continue;
      }
      out += esc(text[i]); i++; continue;
    }
    if (text.startsWith("sqrt{", i)) {
      const [content, next] = readBraced(text, i + 4);
      out += '<span style="display:inline-flex;align-items:flex-start;margin:0 1px;">' +
        '<span style="font-size:1.05em;line-height:1;margin-right:1px;position:relative;top:1px;">&radic;</span>' +
        '<span style="border-top:1.5px solid currentColor;padding-top:1px;">' + mathTextToHTML(content, compact) + '</span></span>';
      i = next;
      continue;
    }
    if (text.startsWith("frac{", i)) {
      const [num, afterNum] = readBraced(text, i + 4);
      if (text[afterNum] === "{") {
        const [den, afterDen] = readBraced(text, afterNum);
        out += fractionHTML(mathTextToHTML(num, compact), mathTextToHTML(den, compact), !!compact);
        i = afterDen;
        continue;
      }
      out += esc(text[i]); i++; continue;
    }
    if (text[i] === "^" && text[i + 1] === "{") {
      const [content, next] = readBraced(text, i + 1);
      // If the exponent contains a fraction or radical, wrapping it in a
      // native <sup> is exactly what got clipped in real Canvas testing.
      // But the radical's own index number -- raised and shrunk using
      // inline-table + vertical-align, never a <sup> tag -- rendered
      // perfectly in that same testing. So for a risky exponent, this
      // reuses that exact non-<sup> technique to get a true stacked
      // fraction, properly raised, without ever touching <sup> at all.
      const risky = /frac\{|sqrt[\[{]/.test(content);
      if (risky) {
        out += '<span style="display:inline-table;vertical-align:top;margin-left:1px;position:relative;top:-0.5em;">' +
          '<span style="display:table-row;"><span style="display:table-cell;font-size:0.7em;line-height:1;vertical-align:top;">' +
          mathTextToHTML(content, true) + '</span></span></span>';
      } else {
        out += '<sup style="font-size:0.7em;line-height:1;">' + mathTextToHTML(content, true) + "</sup>";
      }
      i = next;
      continue;
    }
    if (text[i] === "_" && text[i + 1] === "{") {
      const [content, next] = readBraced(text, i + 1);
      const risky = /frac\{|sqrt[\[{]/.test(content);
      if (risky) {
        out += '<span style="display:inline-table;vertical-align:bottom;margin-left:1px;position:relative;top:0.3em;">' +
          '<span style="display:table-row;"><span style="display:table-cell;font-size:0.7em;line-height:1;vertical-align:bottom;">' +
          mathTextToHTML(content, true) + '</span></span></span>';
      } else {
        out += '<sub style="font-size:0.7em;line-height:1;">' + mathTextToHTML(content, true) + "</sub>";
      }
      i = next;
      continue;
    }
    if (text[i] === "^" && /[A-Za-z0-9-]/.test(text[i + 1] || "")) {
      const m = simpleTokenRe.exec(text.slice(i + 1));
      if (m) { out += '<sup style="font-size:0.7em;line-height:1;">' + esc(m[0]) + "</sup>"; i = i + 1 + m[0].length; continue; }
    }
    if (text[i] === "_" && /[A-Za-z0-9-]/.test(text[i + 1] || "")) {
      const m = simpleTokenRe.exec(text.slice(i + 1));
      if (m) { out += '<sub style="font-size:0.7em;line-height:1;">' + esc(m[0]) + "</sub>"; i = i + 1 + m[0].length; continue; }
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

// Standalone math-to-SVG layout engine, developed and tested in a real
// browser (via canvas.measureText) so metrics are accurate, not guessed.

function buildMathSVG(text, opts) {
  opts = opts || {};
  const fontSize = opts.fontSize || 17;
  const fontFamily = opts.fontFamily || "Calibri, Arial, sans-serif";
  const color = opts.color || "#1A1A2E";

  const _canvas = document.createElement("canvas");
  const ctx = _canvas.getContext("2d");

  function measure(str, size) {
    ctx.font = size + "px " + fontFamily;
    const m = ctx.measureText(str || "");
    const ascent = m.actualBoundingBoxAscent || size * 0.72;
    const descent = m.actualBoundingBoxDescent || size * 0.02;
    return { width: m.width, ascent, descent };
  }

  // ---------- Parse "frac{}/sqrt[n]{}/^{}/_{}" notation into a node tree ----------
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

  function parse(str) {
    const nodes = [];
    let i = 0;
    while (i < str.length) {
      if (str.startsWith("sqrt[", i)) {
        const closeBracket = str.indexOf("]", i);
        if (closeBracket !== -1 && str[closeBracket + 1] === "{") {
          const idx = str.slice(i + 5, closeBracket);
          const [content, next] = readBraced(str, closeBracket + 1);
          nodes.push({ t: "sqrt", index: idx, content: parse(content) });
          i = next;
          continue;
        }
      }
      if (str.startsWith("sqrt{", i)) {
        const [content, next] = readBraced(str, i + 4);
        nodes.push({ t: "sqrt", index: null, content: parse(content) });
        i = next;
        continue;
      }
      if (str.startsWith("frac{", i)) {
        const [num, afterNum] = readBraced(str, i + 4);
        if (str[afterNum] === "{") {
          const [den, afterDen] = readBraced(str, afterNum);
          nodes.push({ t: "frac", num: parse(num), den: parse(den) });
          i = afterDen;
          continue;
        }
      }
      if (str[i] === "^" && str[i + 1] === "{") {
        const [content, next] = readBraced(str, i + 1);
        nodes.push({ t: "sup", base: parse(content) });
        i = next;
        continue;
      }
      if (str[i] === "_" && str[i + 1] === "{") {
        const [content, next] = readBraced(str, i + 1);
        nodes.push({ t: "sub", base: parse(content) });
        i = next;
        continue;
      }
      if (str[i] === "^" && /[A-Za-z0-9-]/.test(str[i + 1] || "")) {
        const m = simpleTokenRe.exec(str.slice(i + 1));
        if (m) { nodes.push({ t: "sup", base: [{ t: "text", s: m[0] }] }); i = i + 1 + m[0].length; continue; }
      }
      if (str[i] === "_" && /[A-Za-z0-9-]/.test(str[i + 1] || "")) {
        const m = simpleTokenRe.exec(str.slice(i + 1));
        if (m) { nodes.push({ t: "sub", base: [{ t: "text", s: m[0] }] }); i = i + 1 + m[0].length; continue; }
      }
      // plain text run until next special marker
      const markers = ["sqrt[", "sqrt{", "frac{"];
      let next = str.length;
      markers.forEach((m) => { const idx = str.indexOf(m, i); if (idx !== -1) next = Math.min(next, idx); });
      for (let j = i; j < str.length; j++) { if (str[j] === "^" || str[j] === "_") { next = Math.min(next, j); break; } }
      if (next === i) { nodes.push({ t: "text", s: str[i] }); i++; } else { nodes.push({ t: "text", s: str.slice(i, next) }); i = next; }
    }
    return nodes;
  }

  // ---------- Layout: turn a node list into a row of positioned glyphs ----------
  // A "row" is {width, ascent, descent, parts: [{x, text?, line?, path?, fontSize?}]}
  const GAP = 2;
  const BAR_GAP = 2;

  function layoutRow(nodes, fontSize) {
    let x = 0;
    let ascent = fontSize * 0.72;
    let descent = fontSize * 0.02;
    const parts = [];

    nodes.forEach((node) => {
      if (node.t === "text") {
        const m = measure(node.s, fontSize);
        parts.push({ text: node.s, x, fontSize, baseline: 0 });
        x += m.width;
        ascent = Math.max(ascent, m.ascent);
        descent = Math.max(descent, m.descent);
      } else if (node.t === "frac") {
        const numRow = layoutRow(node.num, fontSize);
        const denRow = layoutRow(node.den, fontSize);
        const w = Math.max(numRow.width, denRow.width) + GAP * 2;
        const barY = 0; // relative to this fraction's own baseline (see below)
        // Numerator sits above the bar; denominator sits below.
        const numAscentTotal = numRow.ascent + numRow.descent + BAR_GAP;
        const denDescentTotal = denRow.ascent + denRow.descent + BAR_GAP;
        placeSubRow(parts, numRow, x + (w - numRow.width) / 2, -(BAR_GAP + numRow.descent));
        placeSubRow(parts, denRow, x + (w - denRow.width) / 2, denRow.ascent + BAR_GAP);
        parts.push({ line: true, x1: x, x2: x + w, y: barY });
        x += w + GAP * 2;
        ascent = Math.max(ascent, numAscentTotal);
        descent = Math.max(descent, denDescentTotal);
      } else if (node.t === "sup" || node.t === "sub") {
        const subFontSize = fontSize * 0.68;
        const baseRow = layoutRow(node.base, subFontSize);
        const shift = node.t === "sup" ? -(fontSize * 0.38) : (fontSize * 0.20);
        placeSubRow(parts, baseRow, x + 1, shift);
        x += baseRow.width + 1;
        if (node.t === "sup") ascent = Math.max(ascent, -shift + baseRow.ascent);
        else descent = Math.max(descent, shift + baseRow.descent);
      } else if (node.t === "sqrt") {
        const contentRow = layoutRow(node.content, fontSize);
        const hookW = fontSize * 0.42;
        const indexPad = (x > 0 && node.index) ? 3 : 0; // extra gap so a preceding coefficient doesn't crowd the index
        const indexW = node.index ? measure(node.index, fontSize * 0.55).width + 1 + indexPad : 0;
        const barY = -(contentRow.ascent + 3);
        // horizontal bar over the content
        placeSubRow(parts, contentRow, x + indexW + hookW, 0);
        parts.push({ line: true, x1: x + indexW + hookW, x2: x + indexW + hookW + contentRow.width + 2, y: barY });
        // checkmark: from mid-height down to a point, then up to the bar start
        const checkTop = barY;
        const checkBottom = contentRow.descent + 1;
        parts.push({
          path: true,
          d: `M ${x + indexW} ${checkBottom * 0.25} L ${x + indexW + hookW * 0.42} ${checkBottom} L ${x + indexW + hookW} ${checkTop}`,
        });
        if (node.index) {
          parts.push({ text: node.index, x: x + 1 + indexPad, fontSize: fontSize * 0.55, baseline: checkBottom * 0.15 });
        }
        x += indexW + hookW + contentRow.width + 4;
        ascent = Math.max(ascent, -checkTop + 2);
        descent = Math.max(descent, contentRow.descent + 2);
      }
    });

    return { width: x, ascent, descent, parts };
  }

  function placeSubRow(parts, row, offsetX, offsetY) {
    row.parts.forEach((p) => {
      const copy = Object.assign({}, p);
      copy.x = (p.x || 0) + offsetX;
      copy.baseline = (p.baseline || 0) + offsetY;
      if (p.line) { copy.x1 = p.x1 + offsetX; copy.x2 = p.x2 + offsetX; copy.y = p.y + offsetY; }
      if (p.path) { copy.d = shiftPath(p.d, offsetX, offsetY); }
      parts.push(copy);
    });
  }

  function shiftPath(d, dx, dy) {
    return d.replace(/(-?\d+\.?\d*) (-?\d+\.?\d*)/g, (m, a, b) => (parseFloat(a) + dx) + " " + (parseFloat(b) + dy));
  }

  const nodes = parse(text);
  const row = layoutRow(nodes, fontSize);

  const totalHeight = row.ascent + row.descent + 4;
  const baselineY = row.ascent + 2;

  let svgParts = "";
  row.parts.forEach((p) => {
    if (p.text !== undefined) {
      svgParts += `<text xml:space="preserve" x="${p.x.toFixed(1)}" y="${(baselineY + p.baseline).toFixed(1)}" font-size="${p.fontSize.toFixed(1)}" font-family="${fontFamily}" fill="${color}">${escapeXml(p.text)}</text>`;
    } else if (p.line) {
      svgParts += `<line x1="${p.x1.toFixed(1)}" y1="${(baselineY + p.y).toFixed(1)}" x2="${p.x2.toFixed(1)}" y2="${(baselineY + p.y).toFixed(1)}" stroke="${color}" stroke-width="1.3"/>`;
    } else if (p.path) {
      const shifted = p.d.replace(/(-?\d+\.?\d*) (-?\d+\.?\d*)/g, (m, a, b) => a + " " + (parseFloat(b) + baselineY));
      svgParts += `<path d="${shifted}" stroke="${color}" stroke-width="1.3" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`;
    }
  });

  function escapeXml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${Math.ceil(row.width + 4)}" height="${Math.ceil(totalHeight)}" viewBox="0 0 ${Math.ceil(row.width + 4)} ${Math.ceil(totalHeight)}">${svgParts}</svg>`;
  return { svg, width: Math.ceil(row.width + 4), height: Math.ceil(totalHeight) };
}

// Wraps buildMathSVG as a self-contained base64 <img> tag. Used for QTI/Canvas
// export instead of nested HTML: a browser can clip or re-flow nested HTML
// (tables inside <sup>, fraction bars inside a constrained question-text
// container) depending on Canvas's own surrounding CSS, which is exactly
// what caused exponents to look "cut off" and radicals to look "horrible"
// in real Canvas testing. An <img> with a fixed intrinsic width/height is a
// single flat picture -- there is no HTML structure left for any CSS rule,
// anywhere, to clip or mis-style. This is deliberately a stronger, more
// drastic fix than another round of CSS tuning, since two rounds of CSS
// tuning already failed to hold up in real Canvas.
function mathTextToImgTag(text, fontSize) {
  const alt = mathTextToPlain(text).replace(/"/g, "'");
  const { svg, width, height } = buildMathSVG(text, { fontSize: fontSize || 17 });
  const b64 = typeof btoa === "function" ? btoa(unescape(encodeURIComponent(svg))) : "";
  return `<img src="data:image/svg+xml;base64,${b64}" alt="${xmlEscape(alt)}" width="${width}" height="${height}" style="vertical-align:middle;display:inline-block;">`;
}

// Only builds special HTML when math notation is actually present, so plain
// narrative text (most of a Performance Task stimulus) stays as normal,
// lightweight, accessible HTML text.
function mathAwareHTML(text) {
  if (containsMathNotation(text)) return mathTextToMathHTML(text);
  return xmlEscape(String(text || ""));
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
    return `<material><mattext texttype="text/html"><![CDATA[${mathTextToMathHTML(text)}]]></mattext></material>`;
  }
  return `<material><mattext texttype="text/plain">${xmlEscape(text)}</mattext></material>`;
}

// Canvas's Matching question type renders its answer choices as a native
// <select>/<option> dropdown, not as regular rendered content. HTML markup
// inside an <option> element is never interpreted by any browser -- it only
// ever displays as literal text, regardless of the QTI texttype declared.
// So for matching-table columns specifically, HTML formatting can never
// work no matter what the export does; fall back to the plain-text math
// rendering (e.g. "sqrt(x)", "(3/2)") so at least it reads correctly, even
// unformatted, instead of showing raw HTML tags as text.
function qtiMaterialPlainOnly(text) {
  return `<material><mattext texttype="text/plain">${xmlEscape(mathTextToPlain(text))}</mattext></material>`;
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
        .map((c, ci) => `<response_label ident="c${ci}">${qtiMaterialPlainOnly(c)}</response_label>`)
        .join("\n");
      return `<response_lid ident="response${ri}" rcardinality="Single">
        ${qtiMaterialPlainOnly(r)}
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
    ${qtiMaterialPlainOnly(stem)}
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
  if (narrative) html += `<p>${mathAwareHTML(narrative)}</p>`;
  if (stimulus.table && stimulus.table.headers) {
    html += '<table style="border-collapse:collapse;margin:10px 0;">';
    html += "<tr>" + stimulus.table.headers.map((h) => `<th style="border:1px solid #999;padding:6px 10px;background:#f2f2f2;">${mathAwareHTML(String(h))}</th>`).join("") + "</tr>";
    (stimulus.table.rows || []).forEach((row) => {
      html += "<tr>" + row.map((cell) => `<td style="border:1px solid #999;padding:6px 10px;">${mathAwareHTML(String(cell))}</td>`).join("") + "</tr>";
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
  // Canvas's Matching question type renders its answer choices as a native
  // browser dropdown (<select>/<option>), and no browser has ever supported
  // rendering formatted math -- or any HTML/MathML -- inside a dropdown
  // option; it only ever displays literal text. That's a structural limit
  // of the question type itself, not something any QTI content can work
  // around. So Matching items are excluded from the Canvas export
  // specifically (they're unaffected in the Word/PDF export and the
  // on-screen preview, where this constraint doesn't apply), and the
  // teacher is told plainly what was left out and why.
  const matchingCount = (items || []).filter((it) => it.type === "matching_tables").length;
  const exportItems = (items || []).filter((it) => it.type !== "matching_tables");

  if (matchingCount > 0) {
    const noun = matchingCount === 1 ? "question" : "questions";
    const pronoun = matchingCount === 1 ? "it" : "them";
    window.alert(
      `${matchingCount} Matching ${noun} ${matchingCount === 1 ? "was" : "were"} left out of this Canvas file.\n\n` +
      `Canvas's Matching question type shows its answer choices in a plain dropdown, which can't display formatted math no matter what -- that's a Canvas limitation, not something this export can fix.\n\n` +
      `Use the Word or PDF version of this set for ${pronoun}, or swap in a different question type next time.`
    );
  }

  if (exportItems.length === 0) {
    window.alert("Every question in this set was a Matching question, so there's nothing left to export to Canvas. Use the Word or PDF version instead, or add some non-Matching questions to this set.");
    return;
  }

  const zipBytes = buildQTIPackage(title, exportItems, stimulus);
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
