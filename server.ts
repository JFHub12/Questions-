import express from "express";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Sample data mirror for the API
  const questionsData = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"]
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"]
    },
    {
      id: 3,
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"]
    },
    {
      id: 4,
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"]
    },
    {
      id: 5,
      question: "Which element has the chemical symbol 'O'?",
      options: ["Gold", "Oxygen", "Silver", "Iron"]
    },
    {
      id: 6,
      question: "What is the square root of 64?",
      options: ["6", "7", "8", "9"]
    },
    {
      id: 7,
      question: "In which year did World War II end?",
      options: ["1943", "1944", "1945", "1946"]
    },
    {
      id: 8,
      question: "What is the tallest mountain in the world?",
      options: ["K2", "Mount Everest", "Kilimanjaro", "Mount Denali"]
    },
    {
      id: 9,
      question: "Which animal is known as the 'King of the Jungle'?",
      options: ["Tiger", "Elephant", "Lion", "Giraffe"]
    },
    {
      id: 10,
      question: "How many continents are there on Earth?",
      options: ["5", "6", "7", "8"]
    }
  ];

  // API Route - MIRRORS FLASK REQUIREMENT
  app.get("/api/questions", (req, res) => {
    res.json(questionsData);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
