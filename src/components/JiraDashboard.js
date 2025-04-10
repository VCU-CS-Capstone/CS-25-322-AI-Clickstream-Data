import React, { useEffect, useState } from 'react';
import { getIssues, createIssue } from '../api/jiraAPI.js';
import './JiraDashboard.css';

const JiraDashboard = ({ projectKey }) => {
  const [issues, setIssues] = useState([]);
  const [search, setSearch] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [issueType, setIssueType] = useState('Task');
  const [issueKey, setIssueKey] = useState('');

  const fetchIssues = async () => {
    console.log('🔍 Searching for:', search);
    const result = await getIssues(projectKey, search);
    setIssues(result);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleCreateIssue = async () => {
    if (!summary || !description) return alert('Please fill in both fields.');
    const result = await createIssue(projectKey, summary, description, issueType);
    console.log('🎉 Issue created:', result);
    setSummary('');
    setDescription('');
    fetchIssues(); // Refresh list
  };

  return (
    <div className="jira-dashboard">
      <h2>📋 JIRA Integration</h2>

      <div className="search-section">
        <h3>JIRA Issues for Project: {projectKey}</h3>
        <div className="search-bar">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search issues by summary"
          />
          <button onClick={fetchIssues}>Search</button>
        </div>

        <div className="issue-list">
          {issues.length === 0 ? (
            <p>No matching issues found.</p>
          ) : (
            <ul>
              {issues.map((issue) => (
                <li key={issue.id}>
                  <strong>{issue.key}</strong>: {issue.fields.summary}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="create-issue-section">
        <h3>Create New Issue</h3>
        <input
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={issueType} onChange={(e) => setIssueType(e.target.value)}>
          <option value="Task">Task</option>
          <option value="Bug">Bug</option>
          <option value="Story">Story</option>
        </select>
        <input
          type="text"
          placeholder="Issue Key to Update (optional)"
          value={issueKey}
          onChange={(e) => setIssueKey(e.target.value)}
        />
        <button onClick={handleCreateIssue}>Create Issue</button>
        <button disabled>Generate Mock Epics</button>
      </div>
    </div>
  );
};

export default JiraDashboard;
