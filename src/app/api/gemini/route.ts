import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY" },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const model = "gemini-2.5-flash";

    const contents = [
      {
        role: "user",
        parts: [{ text: prompt || "Hello Gemini!" }],
      },
    ];

    const response = await ai.models.generateContent({
      model,
      contents,
    });

    return NextResponse.json({ result: response.text || "" });
  } catch (error) {
    console.error("Gemini error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
