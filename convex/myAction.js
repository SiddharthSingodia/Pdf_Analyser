import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { action } from "./_generated/server.js";
import { api } from "./_generated/api.js";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

// TODO: Move API key to environment variable in production
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export const ingest = action({
  args: {
    splitText: v.array(v.string()),
    fileId: v.string()
  },
  handler: async (ctx, args) => {
    await ConvexVectorStore.fromTexts(
      args.splitText,
      args.splitText.map(() => ({ fileId: args.fileId })),
      new GoogleGenerativeAIEmbeddings({
        apiKey: GEMINI_API_KEY,
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );
    return "Document ingested successfully";
  },
});

export const search = action({
  args: {
    query: v.string(),
    fileId: v.string()
  },
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey: GEMINI_API_KEY,
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title"})
        , { ctx });

    const resultOne = (await vectorStore.similaritySearch(args.query, 1)).filter(q=>q.metadata.fileId===args.fileId);
    console.log(resultOne);
   return JSON.stringify(resultOne);
  },
});  