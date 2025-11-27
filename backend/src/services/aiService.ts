import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is missing");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateDescription(productName: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are an expert product copywriter." },
      { role: "user", content: `Write a catchy auction description for: ${productName}` }
    ],
  });

  return response.choices?.[0]?.message?.content ?? "No description generated.";
}
