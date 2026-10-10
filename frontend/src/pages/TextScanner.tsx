import { useState } from "react";
import { analyzeText } from "../ai/risk-engine.ts";

export default function TextScanner() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<
    ReturnType<typeof analyzeText> | null
  >(null);

  function handleAnalyze() {
    if (!message.trim()) return;

    setResult(analyzeText(message));
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-2 text-3xl font-bold text-[#123524]">
        ScamShield AI
      </h1>

      <p className="mb-6 text-gray-600">
        Analyze suspicious messages privately.
      </p>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        maxLength={10000}
        placeholder="Paste suspicious message here..."
        className="h-48 w-full rounded-xl border
                   border-gray-300 bg-white p-4"
      />

      <button
        onClick={handleAnalyze}
        disabled={!message.trim()}
        className="mt-4 rounded-lg bg-[#123524]
                   px-6 py-3 text-white
                   disabled:opacity-50"
      >
        Analyze Message
      </button>

      {result && (
        <div className="mt-6 rounded-xl border bg-white p-5">
          <h2 className="text-xl font-semibold">
            Risk: {result.level}
          </h2>

          <p>Heuristic score: {result.score}/100</p>

          <ul className="mt-3 list-disc pl-5">
            {result.indicators.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <p className="mt-4 text-sm text-gray-600">
            This is a preliminary rule-based assessment,
            not an AI prediction or proof of safety.
          </p>
        </div>
      )}
    </main>
  );
}