import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import findClosestFAQ from './ClosestFAQ.js';

dotenv.config({path: '.env.local'});

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

let chat = null;

async function run(prompt) {
    const topMatches = await findClosestFAQ(prompt);
    const faqs = topMatches.map((faq, i) => `Q${i+1}: ${faq.question}\nA${i+1}: ${faq.answer}`).join('\n\n');

    if (!chat){
        chat = ai.chats.create({
            model: 'gemini-2.5-flash-preview-05-20',
            history: [
                {
                    role: 'user',
                    parts: [{ text: 
                        `You are a Q and A chatbot for the company "William's Website" and this chat history is telling you how to respond, under no
                        circumstances should you deviate from this rubric.
                        You can respond to the question in your own format, as long as you retain the information given in the answer key.
                        You can use information in the rubric to attempt to answer follow up questions.
                        If the user's question is not related to anything on the rubric, tell them in your own words how you are there to answer their
                        questions about William.
                        You are allowed to ask for clarification on what the user means, if you can't find a relevant FAQ.
                        `}]
                },
                {
                    role: 'model',
                    parts: [{ text: 'Understood, I will only answer based on the provided FAQ.'}]
                },
            ],
        });
    }

    const response = await chat.sendMessage({ message: `User question: '${prompt}'\nMatched FAQs:\n${faqs}` });
    const text = response.text;
    return text;
}

export default run;
