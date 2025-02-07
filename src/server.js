import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

dotenv.config();
const app = express();
app.use(express.json());

//  Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Schema and Model for GA Click Events
const clickSchema = new mongoose.Schema({
  sessionId: String,
  buttonName: String,
  clickTime: Date,
  eventType: String,
});

const ClickEvent = mongoose.model('ClickEvent', clickSchema);

// Initialize GA API
const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: process.env.GOOGLE_CRED,
});

const fetchGA4Data = async () => {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${process.env.GA_PROPERTY_ID}`,
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'eventName' }, { name: 'sessionId' }, { name: 'pagePath' }],
      metrics: [{ name: 'eventCount' }],
    });

    response.rows.forEach(async (row) => {
      const clickEvent = new ClickEvent({
        sessionId: row.dimensionValues[1].value,
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

// API to Retrieve Click Data from MongoDB
app.get('/clicks', async (req, res) => {
  try {
    const clicks = await ClickEvent.find();
    res.json(clicks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5001, () => console.log('Server running on port 5001'));
