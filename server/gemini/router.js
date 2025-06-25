import express from 'express';
import run from './GeminiChat.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const result = await run(req.body.prompt);
        res.json({ response: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Gemini API failed'});
    }
});

export default router;