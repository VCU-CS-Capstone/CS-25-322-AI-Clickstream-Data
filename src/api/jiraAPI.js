// 📁 src/api/jiraAPI.js
import axios from 'axios';

const JIRA_EMAIL = process.env.REACT_APP_JIRA_EMAIL;
const JIRA_TOKEN = process.env.REACT_APP_JIRA_TOKEN;
const JIRA_DOMAIN = process.env.REACT_APP_JIRA_DOMAIN;
const AUTH_HEADER = {
  headers: {
    Authorization: `Basic ${btoa(`${JIRA_EMAIL}:${JIRA_TOKEN}`)}`,
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};

export const getIssues = async (projectKey, searchText = '') => {
  const jql = `project=${projectKey}` + (searchText ? ` AND summary~"${searchText}"` : '');
  try {
    const response = await axios.get(
      `https://${JIRA_DOMAIN}/rest/api/3/search?jql=${encodeURIComponent(jql)}`,
      AUTH_HEADER
    );
    return response.data.issues;
  } catch (error) {
    console.error('Error fetching issues:', error);
    return [];
  }
};

export const createIssue = async (projectKey, summary, description, issueType = 'Task') => {
  const issueData = {
    fields: {
      project: { key: projectKey },
      summary,
      description,
      issuetype: { name: issueType }
    }
  };

  try {
    const response = await axios.post(
      `https://${JIRA_DOMAIN}/rest/api/3/issue`,
      issueData,
      AUTH_HEADER
    );
    return response.data;
  } catch (error) {
    console.error('Error creating issue:', error);
    return null;
  }
};

export const updateIssue = async (issueIdOrKey, fieldsToUpdate) => {
  const data = { fields: fieldsToUpdate };
  try {
    const response = await axios.put(
      `https://${JIRA_DOMAIN}/rest/api/3/issue/${issueIdOrKey}`,
      data,
      AUTH_HEADER
    );
    return response.data;
  } catch (error) {
    console.error('Error updating issue:', error);
    return null;
  }
};

export const createMockEpics = async (projectKey, num = 3) => {
  const mockSummaries = [
    'Improve Help Center UI',
    'Add Feedback Tracking System',
    'Enhance Recommendation Engine'
  ];

  const created = [];
  for (let i = 0; i < num; i++) {
    const summary = mockSummaries[i % mockSummaries.length] + ` #${i + 1}`;
    const desc = `Auto-generated Epic for customer support insight.`;
    const issue = await createIssue(projectKey, summary, desc, 'Epic');
    if (issue) created.push(issue);
  }
  return created;
};
