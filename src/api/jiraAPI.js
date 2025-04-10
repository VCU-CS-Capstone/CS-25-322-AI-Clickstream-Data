import axios from 'axios';

export const getIssues = async (projectKey, searchTerm) => {
  try {
    const response = await axios.post('/api/search-issues', {
      searchTerm,
    });

    console.log('Filtered issues from proxy:', response.data.issues);
    return response.data.issues;
  } catch (error) {
    console.error('Error fetching filtered issues:', error.response?.data || error);
    return [];
  }
};

export const createIssue = async (projectKey, summary, description, issueType) => {
  try {
    const response = await axios.post('/api/create-issue', {
      projectKey,
      summary,
      description,
      issueType
    });
    console.log('Proxy response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error from proxy:', error.response?.data || error);
    return { key: 'unknown' };
  }
};

export const updateIssue = async (issueKey, summary, description) => {
  const domain = process.env.REACT_APP_JIRA_DOMAIN;
  const email = process.env.REACT_APP_JIRA_EMAIL;
  const token = process.env.REACT_APP_JIRA_TOKEN;

  const auth = {
    headers: {
      Authorization: `Basic ${btoa(`${email}:${token}`)}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const url = `https://${domain}/rest/api/3/issue/${issueKey}`;
    const payload = {
      fields: {
        summary,
        description,
      },
    };
    const response = await axios.put(url, payload, auth);
    console.log('Update issue response:', response.status);
    return response.status === 204;
  } catch (error) {
    console.error('Error updating issue:', error.response?.data || error);
    return false;
  }
};
