import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userPrompt, profilePrompt } = await req.json();

  const GROQ_API_KEY = process.env.GROQ_API_KEY;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: profilePrompt },
        { role: "user", content: userPrompt },
      ],
      model: "llama-3.3-70b-versatile",
      max_tokens: 1024,
      temperature: 0.7,
    }),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
