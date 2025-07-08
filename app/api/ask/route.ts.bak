import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import path from "path";
import { encode } from "gpt-3-encoder";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const vectors: VectorChunk[] = []; // Temporarily use empty array


function cosineSim(a: number[], b: number[]): number {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (normA * normB);
}

async function embedText(text: string): Promise<number[]> {
  const res = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });

  return res.data[0].embedding;
}

interface VectorChunk {
  embedding: number[];
  text: string;
  meta: Record<string, any>;
  score?: number;
}

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  if (!query || typeof query !== "string") {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  const questionEmbedding = await embedText(query);

interface RankedVectorChunk extends VectorChunk {
    score: number;
}

interface RankedVectorChunk extends VectorChunk {
    score: number;
}

const ranked: RankedVectorChunk[] = vectors
    .map((chunk: VectorChunk): RankedVectorChunk => ({
        ...chunk,
        score: cosineSim(chunk.embedding, questionEmbedding),
    }))
    .sort((a: RankedVectorChunk, b: RankedVectorChunk) => b.score - a.score)
    .slice(0, 5);

  const context = ranked.map((r) => r.text).join("\n\n");

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that answers questions based only on the provided context.",
      },
      {
        role: "user",
        content: `Answer this using only the context:\n\n${context}\n\nQ: ${query}`,
      },
    ],
  });

  const answer = completion.choices[0].message.content;

  return NextResponse.json({
    answer,
    sources: ranked.map((r) => r.meta),
  });
}
