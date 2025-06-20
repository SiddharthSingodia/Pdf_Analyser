import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { Users } from "lucide-react";  

export default defineSchema({
    users: defineTable({
        userName: v.string(),
        email: v.string(),
        imageUrl: v.string(),
        upgrade:v.boolean(),
    }),

    pdfFiles: defineTable({
        fileId:v.string(),
        fileName:v.string(),
        storageId: v.id("_storage"),
        fileUrl:v.string(),
        createdBy:v.string()
    }),

    documents: defineTable({
        embedding: v.array(v.number()),
        text: v.string(),
        metadata: v.any(),
      }).vectorIndex("byEmbedding", {
        vectorField: "embedding",
        dimensions: 768,
      }),

      notes: defineTable({
        fileId:v.string(),
        notes:v.string(),
        createdBy:v.string()
      }) 
}); 