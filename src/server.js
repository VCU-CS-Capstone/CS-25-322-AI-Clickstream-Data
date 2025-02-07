import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

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

const clickSchema = new mongoose.Schema({
 // sessionId: String,
  eventName: String,
  // clickTime: Date,
  eventType: String,
});
const ClickEvent = mongoose.model('ClickEvent', clickSchema);

// GA API
const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: process.env.GOOGLE_CRED || '/etc/secrets/skilful-frame-450207-b7-bc02171e8288.json',
});

const fetchGA4Data = async () => {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${process.env.GA_PROPERTY_ID}`,
      dateRanges: [{ startDate: '14daysAgo', endDate: 'today' }],
      dimensions: [
        { name: 'eventName' } 
      ],
      metrics: [{ name: 'eventCount' }]
    });

    if (!response.rows) {
      console.warn("No data");
      return;
    }

    response.rows.forEach(async (row) => {
      const clickEvent = new ClickEvent({
        // sessionId: row.dimensionValues[1].value,
        eventName: row.dimensionValues[0].value,
        //clickTime: new Date(),
        eventType: "GA4",
      });
      await clickEvent.save();
      
    });

    console.log('Yay');
  } catch (error) {
    console.error(error);
  }
};

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
      await fetchGA4Data();
      res.status(200).json({ message: "Yay" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log('Server running on port 5001'));
