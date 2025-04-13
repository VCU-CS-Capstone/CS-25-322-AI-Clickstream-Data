import React, { useEffect, useState } from 'react';
import { getIssues } from '../utils/jiraAPI.js';
import './JiraDashboard.css'; // ✅ Make sure this is at the top

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
    <div className="jira-dashboard"> {/* ✅ This wrapper applies the styles */}
      <h2>📋 JIRA Integration</h2>
      <h3>JIRA Issues for Project: {projectKey}</h3>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search issues by summary"
      />
      <button onClick={fetchIssues}>Search</button>

      <ul>
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
  );
};

export default JiraDashboard;
