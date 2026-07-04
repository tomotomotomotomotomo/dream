import { useState } from "react";
import OpenAI from "openai"; // OpenAIライブラリを使いますが、接続先はGroqです
import DreamModel from "./DreamModel";
import { PERSONALITIES } from "../data/personalities";

// Groq用の設定
const groq = new OpenAI({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
  dangerouslyAllowBrowser: true,
});

export default function DreamAnalyzer() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const analyzeDream = async () => {
    const prompt = `以下の夢を分析し、52個のパーソナリティから最も近いものを1つ選んで。
    候補: ${Object.keys(PERSONALITIES).join(", ")}
    JSONで { "name": "名前", "reason": "理由" } と返して。
    夢: ${text}`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama3-70b-8192", // 高性能なモデル
    });

    const data = JSON.parse(completion.choices[0].message.content.replace(/```json|```/g, ""));
    setResult({ ...data, model: PERSONALITIES[data.name]?.model || "default.glb" });
  };

  return (
    <div>
      <textarea onChange={(e) => setText(e.target.value)} />
      <button onClick={analyzeDream}>診断する</button>
      {result && (
        <>
          <h2>結果: {result.name}</h2>
          <DreamModel modelFileName={result.model} />
        </>
      )}
    </div>
  );
}
