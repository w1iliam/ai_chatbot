import embedPrompt from './utils/EmbedPrompt.js';
import fs from 'fs';
import cosinesim from './utils/CosineSimilarity.js'

const faqData = JSON.parse(fs.readFileSync('./gemini/faq_embeddings.json', 'utf-8'));

async function findClosestFAQ(prompt, topK = 2){
    const promptVector = await embedPrompt(prompt);

    const matches = faqData.map(faq => ({
        question: faq.question,
        answer: faq.answer,
        score: cosinesim(promptVector, faq.embedding),
    }));

    const topMatches = matches.sort((a, b) => b.score - a.score).slice(0, topK);

    return topMatches
}

export default findClosestFAQ;
