import axios from 'axios';

const domain = process.env.REACT_APP_JIRA_DOMAIN;
const email = process.env.REACT_APP_JIRA_EMAIL;
const token = process.env.REACT_APP_JIRA_TOKEN;

const auth = {
  headers: {
    Authorization: `Basic ${btoa(`${email}:${token}`)}`,
    'Content-Type': 'application/json',
  },
};

export const getIssues = async (projectKey) => {
  try {
    const jql = `project=${projectKey} ORDER BY created DESC`;
    const url = `https://${domain}/rest/api/3/search?jql=${encodeURIComponent(jql)}`;
    const response = await axios.get(url, auth);
    console.log('Fetched issues:', response.data);
    return response.data.issues;
  } catch (error) {
    console.error('Error fetching issues:', error.response?.data || error);
    return [];
  }
};

export const createIssue = async (projectKey, summary, description, issueType) => {
  try {
    const url = `https://${domain}/rest/api/3/issue`;
    const payload = {
      fields: {
        project: { key: projectKey },
        summary,
        description,
        issuetype: { name: issueType },
      },
    };
    const response = await axios.post(url, payload, auth);
    console.log('Create issue response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating issue:', error.response?.data || error);
    return { key: 'unknown' };
  }
};

export const updateIssue = async (issueKey, summary, description) => {
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
