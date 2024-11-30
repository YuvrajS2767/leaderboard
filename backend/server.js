import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

const leaderboardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  xp: { type: Number, required: true },
  avatar: { type: String }
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

app.get('/api/leaderboard', async (req, res) => {
  try {
    const leaders = await Leaderboard.find().sort({ xp: -1 });
    res.json(leaders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard data', error });
  }
});

app.post('/api/leaderboard', async (req, res) => {
  const { name, xp, avatar } = req.body;
  const newEntry = new Leaderboard({ name, xp, avatar });

  try {
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    res.status(400).json({ message: 'Error saving leaderboard entry', error });
  }
});

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error('Error: API_KEY is missing from the environment variables!');
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body;

  try {
    const result = await model.generateContentStream(prompt);
    res.setHeader('Content-Type', 'text/plain');
    
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      res.write(chunkText); 
    }

    res.end(); 
  } catch (error) {
    console.error('Error generating content:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
