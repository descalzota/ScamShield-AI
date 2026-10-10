import { useState } from "react";
import { extractText } from "../ai/ocr";

export default function ImageScanner() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpload(file: File) {
    if (!file.type.startsWith("image/")) return;
    if (file.size > 5 * 1024 * 1024) return;

    setLoading(true);

    try {
      const extracted = await extractText(file);
      setText(extracted);
    } catch {
      setText("Unable to extract text.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">
        Screenshot Scanner
      </h1>

      <input
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleUpload(file);
        }}
      />

      {loading && <p>Extracting text locally...</p>}

      <textarea
        className="mt-4 h-48 w-full rounded border p-3"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </main>
  );
}