import router from './gemini/router.js';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/gemini',router);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
