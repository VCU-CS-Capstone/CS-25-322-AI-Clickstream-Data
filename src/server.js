import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import path from 'path';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({origin: '*'}));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Success"))
  .catch((err) => {
    console.error("Connection Error:", err);
    process.exit(1);
  });

const InteractionSchema = new mongoose.Schema({
  eventType: String,  // 'button_click' or 'search'
  eventValue: String, // Button name or search term
});

export const Interaction = mongoose.model('Interaction', InteractionSchema);

// GA API
const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: process.env.GOOGLE_CRED || '/etc/secrets/skilful-frame-450207-b7-bc02171e8288.json',
});

async function fetchInteractions() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${process.env.GA_PROPERTY_ID}`,
    dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
    metrics: [{ name: 'eventCount' }],
    dimensions: [
      { name: 'eventName' },
      { name: 'eventParameterKey' },
      { name: 'eventParameterValue' },
    ]
  });

  const interactions = [];

  response.rows.forEach(row => {
    const eventName = row.dimensionValues[0].value;
    const eventParameterKey = row.dimensionValues[1].value;
    const eventParameterValue = row.dimensionValues[2].value;

    if (eventName === 'button_click' && eventParameterKey === 'button_name') {
      interactions.push({ eventType: 'button_click', eventValue: eventParameterValue });
    }

    if (eventName === 'search' && eventParameterKey === 'search_term') {
      interactions.push({ eventType: 'search', eventValue: eventParameterValue });
    }
  });

  return interactions;
}

async function storeInteractions() {
  const interactions = await fetchInteractions();

  if (interactions.length > 0) {
    await Interaction.insertMany(interactions);
    console.log(`Stored ${interactions.length} interactions`);
  } else {
    console.log("No new interactions to store.");
  }
}

app.get('/interactions', async (req, res) => {
  try {
    const data = await Interaction.find().limit(50);
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/", (req, res) => {
  res.send("/ is working");
});

/*
app.get('/get-clicks', async (req, res) => {
  try {
      const clicks = await ClickEvent.find();
      res.json(clicks);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});
*/

app.get('/fetch-ga4-data', async (req, res) => {
  try {
      console.log("Fetching");
      await storeInteractions();
      res.status(200).json({ message: "Yay" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
  }
});


// Serve React build files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all route for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log('Server running on port 5001'));
