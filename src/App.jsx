import React, { useState } from "react";
import WorksheetConverter from "./WorksheetConverter";
import TopicPracticeGenerator from "./TopicPracticeGenerator";
import PerformanceTaskBuilder from "./PerformanceTaskBuilder";

const NAVY = "#21295C";
const TEAL = "#1C7293";
const BORDER = "#DCE6EA";
const MUTED = "#5B6B76";

const TABS = [
  { id: "worksheet", label: "Worksheet CAASPPify" },
  { id: "practice", label: "Topic Practice Generator" },
  { id: "pt", label: "Performance Task Builder" },
];

export default function App() {
  const [tab, setTab] = useState("worksheet");

  return (
    <div style={{ minHeight: "100vh", background: "#F7FAFB" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "20px 16px 0" }} className="no-print">
        <div style={{ display: "flex", gap: 8, borderBottom: `2px solid ${BORDER}`, paddingBottom: 0 }}>
          {TABS.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  padding: "10px 18px",
                  border: "none",
                  background: "transparent",
                  fontFamily: "Calibri, 'Segoe UI', system-ui, sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: active ? NAVY : MUTED,
                  borderBottom: active ? `3px solid ${TEAL}` : "3px solid transparent",
                  marginBottom: -2,
                  cursor: "pointer",
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {tab === "worksheet" && <WorksheetConverter />}
      {tab === "practice" && <TopicPracticeGenerator />}
      {tab === "pt" && <PerformanceTaskBuilder />}
    </div>
  );
}
