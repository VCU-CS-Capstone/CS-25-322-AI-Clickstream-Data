export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { summary, description, issuetype, projectKey } = req.body;
  
    const domain = process.env.REACT_APP_JIRA_DOMAIN;
    const email = process.env.REACT_APP_JIRA_EMAIL;
    const token = process.env.REACT_APP_JIRA_TOKEN;
  
    const response = await fetch(`https://${domain}/rest/api/3/issue`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${email}:${token}`).toString('base64')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fields: {
          project: { key: projectKey },
          summary,
          description: {
            type: "doc",
            version: 1,
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: description
                  }
                ]
              }
            ]
          },
          issuetype: { name: issuetype }
        }
      }),
      
    });

    const data = await response.json();

    if (!response.ok) {
        console.error('🔴 JIRA API ERROR:', {
            status: response.status,
            message: data,
            request: {
                summary,
                description,
                issuetype,
                projectKey,
            }
        });
    return res.status(response.status).json({ error: data });
    }

    console.log('✅ JIRA issue created:', data);
    return res.status(200).json(data);
  }
  