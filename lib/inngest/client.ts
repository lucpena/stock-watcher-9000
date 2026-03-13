import { Inngest } from "inngest";

export const inngest = new Inngest({
    id: 'stock-watcher-9000',
    ai: {
        gemini: { apiKey: process.env.GEMINI_API_KEY },
    }
});