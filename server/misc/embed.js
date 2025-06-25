import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config({path: '../.env.local'});

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

async function embedFAQs() {
  const inputFile = './faqs.json';
  const outputFile = './faq_embeddings.json';

  const faqs = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));

  const result = await ai.models.embedContent({
    model: 'gemini-embedding-exp-03-07',
    contents: faqs.map(f => f.question),
  });

  const embedded = faqs.map((faq, i) => ({
    ...faq,
    embedding: result.embeddings[i].values,
  }));

  fs.writeFileSync(outputFile, JSON.stringify(embedded, null, 2));
  console.log(`Embedded ${embedded.length} questions to ${outputFile}`);
}

embedFAQs();
