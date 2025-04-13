// api/search-issues.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { searchTerm } = req.body;

  if (!searchTerm || typeof searchTerm !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing searchTerm' });
  }

  console.log("📥 Received search term:", searchTerm);

  const domain = process.env.JIRA_DOMAIN;
  const auth = Buffer.from(
    `${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}`
  ).toString('base64');

  const jql = `project=MYH AND summary~"${searchTerm}"`;
  const url = `https://${domain}/rest/api/3/search?jql=${encodeURIComponent(jql)}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ JIRA SEARCH ERROR:", {
        status: response.status,
        error: data,
      });
      return res.status(response.status).json({ error: data });
    }

    console.log("✅ Filtered issues fetched:", data.issues?.length || 0);
    return res.status(200).json({ issues: data.issues });
  } catch (err) {
    console.error("❌ Server error during search:", err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
