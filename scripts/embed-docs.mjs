import fs from "fs";
import path from "path";
import { encode } from "gpt-3-encoder";
import pdfParse from "pdf-parse";
import dotenv from "dotenv";
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GITHUB_USER = "michaelpmurphy14";
const OUTPUT_PATH = "./vectorstore/vectors.json";
const PRIVATE_DOCS_PATH = "./private_docs";

// --- UTILS ---

async function embedText(text) {
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      input: text,
      model: "text-embedding-3-small",
    }),
  });

  const json = await res.json();

  if (!res.ok) {
    console.error("❌ OpenAI API error:", res.status, json?.error?.message);
    throw new Error(`OpenAI error: ${json?.error?.message || "Unknown error"}`);
  }

  if (!json?.data || !Array.isArray(json.data) || !json.data[0]) {
    console.error("❌ Malformed OpenAI response:", JSON.stringify(json, null, 2));
    throw new Error("Embedding failed: missing 'data[0]'");
  }

  return json.data[0].embedding;
}


function chunkText(text, maxTokens = 300) {
  const words = text.split(/\s+/);
  const chunks = [];
  let chunk = [];

  for (let word of words) {
    const tentative = [...chunk, word].join(" ");
    if (encode(tentative).length > maxTokens) {
      chunks.push(chunk.join(" "));
      chunk = [word];
    } else {
      chunk.push(word);
    }
  }

  if (chunk.length > 0) chunks.push(chunk.join(" "));
  return chunks;
}

// --- PRIVATE DOCS (with pdf-parse only) ---

async function loadPrivateDocs() {
  const files = fs.readdirSync(PRIVATE_DOCS_PATH);
  const chunks = [];

  for (const file of files) {
    if (!file.endsWith(".pdf")) continue;

    const filePath = path.join(PRIVATE_DOCS_PATH, file);
    const data = fs.readFileSync(filePath);
    const parsed = await pdfParse(data);

    const textChunks = chunkText(parsed.text);
    for (const chunk of textChunks) {
      chunks.push({
        text: chunk,
        source: "private_doc",
        meta: { filename: file },
      });
    }
  }

  return chunks;
}

// --- GITHUB REPOS ---

async function getPinnedRepos() {
  const res = await fetch(`https://gh-pinned-repos.egoist.dev/?username=${GITHUB_USER}`);
  return await res.json();
}

async function loadGitHubRepos() {
  const pinned = await getPinnedRepos();
  const chunks = [];

  for (const repo of pinned) {
    const readmeUrl = `https://raw.githubusercontent.com/${GITHUB_USER}/${repo.repo}/main/README.md`;
    const res = await fetch(readmeUrl);
    const readme = res.ok ? await res.text() : "";

    const meta = {
      repo: repo.repo,
      description: repo.description,
      link: `https://github.com/${GITHUB_USER}/${repo.repo}`,
    };

    const textChunks = chunkText(`${repo.description}\n\n${readme}`);
    for (const chunk of textChunks) {
      chunks.push({
        text: chunk,
        source: "github",
        meta,
      });
    }
  }

  return chunks;
}

// --- MAIN ---

async function main() {
  console.log("🔍 Loading documents...");
  const docs = await loadPrivateDocs();
  const github = await loadGitHubRepos();
  const all = [...docs, ...github];
  const embedded = [];

  console.log(`🧠 Embedding ${all.length} chunks...`);

  for (const [i, chunk] of all.entries()) {
    try {
      const embedding = await embedText(chunk.text);
      embedded.push({ ...chunk, embedding });

      if ((i + 1) % 10 === 0 || i + 1 === all.length) {
        console.log(`  → ${i + 1}/${all.length} embedded`);
      }
    } catch (err) {
      console.warn(`⚠️ Skipping chunk ${i + 1} due to error: ${err.message}`);
    }
  }

  if (!fs.existsSync("./vectorstore")) {
    fs.mkdirSync("./vectorstore");
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(embedded, null, 2));
  console.log(`✅ Saved ${embedded.length} vectors to ${OUTPUT_PATH}`);
}

main();
