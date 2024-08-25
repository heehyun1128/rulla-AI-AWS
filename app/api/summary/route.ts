import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {

    const reqBody = await req.json();
    const textContent = reqBody.text; 

    if (!openai.apiKey) {
      console.error("OpenAI API key is missing");
      return NextResponse.json({
        error: "OpenAI API key is missing",
        success: false,
      });
    }

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Can you generate 3 bullet points to summarize the following content: ${textContent}`,
        },
      ],
      max_tokens: 1000,
    });

    // Return the response
    return NextResponse.json({ summary: response.choices[0].message.content });
  } catch (err) {
    console.error("Error processing request:", err);

    return NextResponse.json({ error: `System Error: ${err}`, success: false });
  }
}
