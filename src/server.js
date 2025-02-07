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

//  Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Success"))
  .catch((err) => {
    console.error("Connection Error:", err);
    process.exit(1);
  });

// Schema and Model for GA Click Events
const clickSchema = new mongoose.Schema({
  sessionId: String,
  buttonName: String,
  clickTime: Date,
  eventType: String,
});
const ClickEvent = mongoose.model('ClickEvent', clickSchema);

if (!fs.existsSync(process.env.GOOGLE_CRED)) {
  console.error("Google Credentials file missing!");
  process.exit(1);
}

// Initialize GA API
const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: process.env.GOOGLE_CRED || '/etc/secrets/skilful-frame-450207-b7-bc02171e8288.json',
});

const fetchGA4Data = async () => {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${process.env.GA_PROPERTY_ID}`,
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }]
    });

    if (!response.rows) {
      console.warn("No data in GA");
      return;
    }

    response.rows.forEach(async (row) => {
      const clickEvent = new ClickEvent({
   //     sessionId: row.dimensionValues[1].value,
        buttonName: row.dimensionValues[0].value,
        clickTime: new Date(),
        eventType: "GA4",
      });

      await clickEvent.save();
    });

    console.log('GA4 Data stored in MongoDB');
  } catch (error) {
    console.error('Error fetching GA4 data:', error);
  }
};

// Run Fetch Every 30 Minutes
setInterval(fetchGA4Data, 30 * 60 * 1000);

app.get("/", (req, res) => {
  res.send("/ is working");
});

// API to Retrieve Click Data from MongoDB
app.get('/get-clicks', async (req, res) => {
  try {
      const clicks = await ClickEvent.find();
      res.json(clicks);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

app.get('/fetch-ga4-data', async (req, res) => {
  try {
      console.log("Manually fetching");
      await fetchGA4Data();
      res.status(200).json({ message: "Successful data fetch" });
  } catch (error) {
      console.error("Error fetching:", error);
      res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log('Server running on port 5001'));
