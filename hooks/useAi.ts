import { useState } from "react";

export function useAi(toolId: string) {
  const [result, setResult] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeModel, setActiveModel] = useState("gpt-4o-mini");

  const generate = async (prompt: string, systemPrompt?: string, modelOverride?: string) => {
    const model = modelOverride || activeModel;
    setIsGenerating(true);
    setError(null);
    setResult("");

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, systemPrompt, toolId, model }),
      });

      const data = await response.json();

      if (data.error) throw new Error(data.error);

      // Simulate streaming/typing effect for a "ChatGPT" feel
      const fullText = data.text;
      let currentText = "";
      const words = fullText.split(" ");
      
      for (let i = 0; i < words.length; i++) {
        currentText += words[i] + " ";
        setResult(currentText);
        // Varying speeds for more natural look
        await new Promise((resolve) => setTimeout(resolve, 20 + Math.random() * 40));
      }

    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const reset = () => {
    setResult("");
    setError(null);
  };

  return { result, isGenerating, error, generate, reset, activeModel, setActiveModel };
}
