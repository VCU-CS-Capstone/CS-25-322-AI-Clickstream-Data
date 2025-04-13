// /api/fetch-analytics.js
import { google } from 'googleapis';

export default async function handler(req, res) {
  // ✅ Step 1: TEMPORARY LOGS
  console.log("🔍 GA_CREDENTIALS_JSON present:", !!process.env.GA_CREDENTIALS_JSON);
  console.log("🔍 GA4_PROPERTY_ID:", process.env.GA4_PROPERTY_ID);

  try {
    // ✅ Step 2: Wrapped parsing in try/catch
    let credentials;
    try {
      credentials = JSON.parse(process.env.GA_CREDENTIALS_JSON);
    } catch (err) {
      console.error('❌ Failed to parse GA_CREDENTIALS_JSON:', err.message);
      return res.status(500).json({ error: 'Invalid GA_CREDENTIALS_JSON format' });
    }

    const propertyId = process.env.GA4_PROPERTY_ID;

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    const analyticsDataClient = google.analyticsdata({
      version: 'v1beta',
      auth: await auth.getClient(),
    });

    const response = await analyticsDataClient.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dimensions: [{ name: 'pagePath' }],
        metrics: [
          { name: 'screenPageViews' },
          { name: 'averageSessionDuration' },
        ],
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        limit: 10,
        orderBys: [
          {
            desc: true,
            metric: { metricName: 'screenPageViews' },
          },
        ],
      },
    });

    res.status(200).json({
      rows: response.data.rows || [],
      headers: response.data.dimensionHeaders.concat(response.data.metricHeaders),
    });
  } catch (error) {
    console.error('❌ Error fetching analytics data:', error);
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
}
