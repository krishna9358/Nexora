import { NextResponse } from "next/server";
import { getChatResponse } from "@/configs/AiModel";

export async function POST(req) {
    try {
        const body = await req.json();
        const messages = body.messages;

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: "Invalid messages format" },
                { status: 400 }
            );
        }

        const response = await getChatResponse(messages);
        
        return NextResponse.json({ 
            result: {
                role: "assistant",
                content: response
            }
        });
    } catch (error) {
        console.error('Error in AI chat route:', error);
        return NextResponse.json(
            { error: error.message || "Failed to generate content" }, 
            { status: 500 }
        );
    } 
}