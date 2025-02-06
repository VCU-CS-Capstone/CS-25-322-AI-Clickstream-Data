import express from 'express';
import connectDB from './db.js';
import mongoose from 'mongoose';

// Define Schema
const ClickSchema = new mongoose.Schema({
  sessionId: String,
  buttonName: String,
  clickTime: { type: Date, default: Date.now },
});

// Create Model
const Click = mongoose.model('Click', ClickSchema);

// Connect to DB
connectDB();

const app = express();
app.use(express.json());

// API to Log Clicks
app.post('/log-click', async (req, res) => {
  try {
    const { sessionId, buttonName } = req.body;

    const click = new Click({ sessionId, buttonName });
    await click.save();

    res.status(201).json({ message: 'Click logged successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/clicks', async (req, res) => {
  try {
    const clicks = await Click.find();
    res.json(clicks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(5001, () => console.log('Server running on port 5001'));
