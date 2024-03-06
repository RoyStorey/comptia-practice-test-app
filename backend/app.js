import express from "express";
import OpenAI from "openai";
import cors from "cors";
import dotenv from "dotenv";
import { rateLimit } from "express-rate-limit";
import postgreSQLClient from "./postgres.js";

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  limit: 80, // Limit each IP to 80 requests per `window` (here, per 60 minutes).
});

const app = express();
dotenv.config();
app.use(limiter);
app.use(cors());
app.use(express.json());
const port = 3000;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function getCorrectnessFromFeedback(feedback) {
  const lowerFeedback = feedback.toLowerCase();

  if (lowerFeedback.includes("partially correct")) {
    return "Partially Correct";
  } else if (
    lowerFeedback.includes("correct") &&
    !lowerFeedback.includes("incorrect")
  ) {
    return "Correct";
  } else if (lowerFeedback.includes("incorrect")) {
    return "Incorrect";
  } else {
    return "Unsure";
  }
}
function formatGPTPrompt(objectiveSelected, testSelected) {
  if (objectiveSelected != "No objective selected...") {
    return `Give me one question from the ${testSelected} exam that is related to ${objectiveSelected}, and do not give me the answer. Do not give me multiple choice questions. I want a question that requires a written response. Err lightly on the side of correct.`;
  } else {
    return `Give me one question from the ${testSelected} exam, and do not give me the answer. Do not give me multiple choice questions. I want a question that requires a written response. Err lightly on the side of correct.`;
  }
}
let conversation = {
  userid: "",
  test: "",
  objective: "",
  query: "",
  gptQuestion: "",
  userAnswer: "",
  correctness: "",
  gptFeedback: "",
};

app.get("/api/get-question/:test/:objective", async (req, res) => {
  const testSelected = req.params.test;
  const objectiveSelected = req.params.objective;
  let gptQuery = formatGPTPrompt(objectiveSelected, testSelected);

  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: gptQuery }],
    stream: true,
  });
  let response = "";
  for await (const chunk of stream) {
    response += chunk.choices[0]?.delta?.content || "";
  }
  res.json({ data: response });

  conversation.test = testSelected;
  conversation.objective = objectiveSelected;
  conversation.query = gptQuery;
  conversation.gptQuestion = response;
});

app.post("/api/post-user-answer", async (req, res) => {
  const client = await postgreSQLClient.connect();

  const { question, answer } = req.body;
  let gptQuery = `The question is: ${question}. The user's answer is: ${answer}. is this Correct | Incorrect | Partially Correct? if incorrect or partially correct, what is the correct answer, and provide feedback?`;
  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: gptQuery }],
    stream: true,
  });
  let response = "";
  for await (const chunk of stream) {
    response += chunk.choices[0]?.delta?.content || "";
  }
  res.json({ data: response });

  conversation.correctness = getCorrectnessFromFeedback(response);
  conversation.userAnswer = answer;
  conversation.gptFeedback = response;

  try {
    const dbquery = `
    INSERT INTO conversations (userid, test, objective, query, gptquestion, useranswer, correctness, gptfeedback)
    VALUES ('${conversation.userid}', '${conversation.test}', '${conversation.objective}', '${conversation.query}', '${conversation.gptQuestion}', '${conversation.userAnswer}', '${conversation.correctness}', '${conversation.gptFeedback}');
    `;
    console.log(dbquery);
    await client.query(dbquery);
    client.release();
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/get-conversations", async (req, res) => {
  const client = await postgreSQLClient.connect();
  const dbquery = "SELECT * FROM conversations";
  const { rows } = await client.query(dbquery);
  client.release();
  res.json({ data: rows });
});

app.listen(port, () => {
  console.log(`Server running at http://${process.env.SERVER}:${port}`);
});
