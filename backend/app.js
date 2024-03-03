import express from 'express';
import OpenAI from 'openai';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get('/api/get-question/:test/:objective', async (req, res) => {
  const testSelected = req.params.test;
  const objectiveSelected = req.params.objective;
  let query = '';

  if (objectiveSelected) {
    query = `Give me one question from the ${testSelected} exam that is related to ${objectiveSelected}, and do not give me the answer. Do not give me multiple choice questions. I want a question that requires a written response. Err lightly on the side of correct.`;
  } else {
    query = `Give me one question from the ${testSelected} exam, and do not give me the answer. Do not give me multiple choice questions. I want a question that requires a written response. Err lightly on the side of correct.`;
  }

  console.log('Request received')
  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: query }],
    stream: true,
  });
  let response = '';
  for await (const chunk of stream) {
    response += chunk.choices[0]?.delta?.content || "";
  }
  res.json({ data: response });
});

app.post('/api/post-user-answer', async (req, res) => {
  const { question, answer } = req.body;
  const query = `The question is: ${question}. The user's answer is: ${answer}. is this Correct | Incorrect | Partially Correct? if incorrect or partially correct, what is the correct answer, and provide feedback?`;
  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: query }],
    stream: true,
  });
  let response = '';
  for await (const chunk of stream) {
    response += chunk.choices[0]?.delta?.content || "";
  }
  res.json({ data: response });
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});