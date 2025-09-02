import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config({path: '.env.local'});

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });


async function embedPrompt(prompt) {
    const result = await ai.models.embedContent({
        model: 'gemini-embedding-exp-03-07',
        contents: prompt,
    });
    return result.embeddings[0].values;
}

export default embedPrompt;
