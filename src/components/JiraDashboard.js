// src/components/JiraDashboard.js
import React, { useEffect, useState } from 'react';
import { getIssues } from '../api/jiraAPI.js';
import CreateIssueForm from './CreateIssueForm.js';
import './JiraDashboard.css';

const JiraDashboard = ({ projectKey }) => {
  const [issues, setIssues] = useState([]);
  const [search, setSearch] = useState('');

  const fetchIssues = async () => {
    console.log('🔍 Searching for:', search);
    const result = await getIssues(projectKey, search);
    setIssues(result);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <div className="jira-dashboard-container">
      <h2 className="jira-title">📋 JIRA Integration</h2>

      <div className="jira-section-wrapper">
        {/* Issue Search & Results */}
        <div className="jira-issues">
          <h3>JIRA Issues for Project: {projectKey}</h3>
          <div className="search-row">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search issues by summary"
            />
            <button onClick={fetchIssues}>Search</button>
          </div>

          <ul className="issues-list">
            {issues.length === 0 ? (
              <li>No matching issues found.</li>
            ) : (
              issues.map((issue) => (
                <li key={issue.id}>
                  <strong>{issue.key}</strong>: {issue.fields.summary}
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Issue Form */}
        <div className="jira-create">
          <CreateIssueForm />
        </div>
      </div>
    </div>
  );
};

export default JiraDashboard;
