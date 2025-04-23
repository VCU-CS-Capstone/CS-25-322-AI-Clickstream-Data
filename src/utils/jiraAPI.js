import axios from 'axios';

// 🔍 Fetch issues filtered by searchTerm (via proxy to /api/search-issues)
export const getIssues = async (projectKey, searchTerm) => {
  try {
    const response = await axios.post('/api/search-issues', { searchTerm });

    console.log('✅ Filtered issues from proxy:', response.data.issues);
    return response.data.issues || [];
  } catch (error) {
    console.error('❌ Error fetching filtered issues:', error.response?.data || error);
    return [];
  }
};

// 🆕 Create a new JIRA issue (via proxy)
export const createIssue = async (projectKey, summary, description, issueType) => {
  try {
    const response = await axios.post('/api/create-issue', {
      projectKey,
      summary,
      description,
      issuetype: issueType, // ✅ FIXED: match the backend expected key
    });

    console.log('✅ Created issue via proxy:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error creating issue via proxy:', error.response?.data || error);
    return { key: 'unknown' };
  }
};

// 🛠️ Update an existing JIRA issue directly (not via proxy)
export const updateIssue = async (issueKey, summary, description) => {
  const domain = process.env.REACT_APP_JIRA_DOMAIN;
  const email = process.env.REACT_APP_JIRA_EMAIL;
  const token = process.env.REACT_APP_JIRA_TOKEN;

  const authHeader = `Basic ${btoa(`${email}:${token}`)}`;
  const url = `https://${domain}/rest/api/3/issue/${issueKey}`;
  const payload = {
    fields: {
      summary,
      description,
    },
  };

  try {
    const response = await axios.put(url, payload, {
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
      },
    });

    console.log('✅ Issue updated:', response.status);
    return response.status === 204;
  } catch (error) {
    console.error('❌ Error updating issue:', error.response?.data || error);
    return false;
  }
};
