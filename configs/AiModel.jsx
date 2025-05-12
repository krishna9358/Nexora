
import Prompt from '@/data/Prompt';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the AI model
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// Create a chat model instance
export async function getChatResponse(messages) {
    try {
        if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
            throw new Error('NEXT_PUBLIC_GEMINI_API_KEY is not configured');
        }

        console.log('Input messages:', messages);

        // Convert messages to the format expected by Gemini
        const formattedMessages = messages.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        console.log('Formatted messages:', formattedMessages);

        // Get the chat model
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        // Start a chat session
        const chat = model.startChat({
            history: formattedMessages.slice(0, -1), // Previous messages
            generationConfig: {
                maxOutputTokens: 2048,
            },
        });

        // Send the last message and get response
        const lastMessage = formattedMessages[formattedMessages.length - 1].parts[0].text;
        console.log('Sending last message:', lastMessage);

        const result = await chat.sendMessage(lastMessage + Prompt.CHAT_PROMPT);
        const response = await result.response;
        const text = response.text();

        console.log('AI response:', text);
        return text;
    } catch (error) {
        console.error('Error in getChatResponse:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        throw error;
    }
}