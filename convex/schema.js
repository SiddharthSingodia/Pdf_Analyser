import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { Users } from "lucide-react";

export default defineSchema({
    Users: defineTable({
        userName: v.string(),
        email: v.string(),
        imageUrl: v.string(),
        
    })
})