// /api/fetch-analytics.js
import { google } from 'googleapis';

export default async function handler(req, res) {
  try {
    // Load credentials and property ID from environment
    const credentials = JSON.parse(process.env.GA_CREDENTIALS_JSON);
    const propertyId = process.env.GA4_PROPERTY_ID;

    // Authenticate with Google
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    const analyticsDataClient = google.analyticsdata({
      version: 'v1beta',
      auth: await auth.getClient(),
    });

    // Query data
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

    // Return formatted data
    res.status(200).json({
      rows: response.data.rows || [],
      headers: response.data.dimensionHeaders.concat(response.data.metricHeaders),
    });
  } catch (error) {
    console.error('❌ Error fetching analytics data:', error);
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
}
