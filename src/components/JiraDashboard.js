// src/components/JiraDashboard.js

import React, { useEffect, useState } from 'react';
import { getIssues } from '../utils/jiraAPI.js';
import './JiraDashboard.css';

const JiraDashboard = ({ projectKey }) => {
  const [issues, setIssues] = useState([]);
  const [search, setSearch] = useState('');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [aiSuggestions, setAiSuggestions] = useState('');

  // ✅ Fetch analytics data on mount
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch('/api/fetch-analytics');
        const data = await res.json();
        setAnalyticsData(data);
        console.log('📊 Analytics fetched:', data);
      } catch (err) {
        console.error('❌ Failed to fetch analytics:', err);
      }
    };
    fetchAnalytics();
  }, []);

  // ✅ Fetch issues when user searches
  const fetchIssues = async () => {
    if (!search.trim()) {
      alert('Please enter a search term');
      return;
    }

    console.log('🔍 Searching for:', search);
    const result = await getIssues(projectKey, search);
    setIssues(result);
  };

  // ✅ Trigger AI suggestion generation
  const fetchAISuggestions = async () => {
    if (!analyticsData || typeof analyticsData !== 'object') {
      alert('Analytics data not yet loaded or malformed');
      return;
    }
  
    try {
      const response = await fetch('/api/analyze-analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ analyticsData }),
      });
  
      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');
  
      if (!response.ok) {
        const error = isJson ? await response.json() : await response.text();
        throw new Error(error?.error || error || 'Unknown error');
      }
  
      const result = await response.json();
      console.log('✅ AI Suggestions:', result);
      setAiSuggestions(result.suggestions);
    } catch (err) {
      console.error('❌ Error fetching AI suggestions:', err.message || err);
      setAiSuggestions('Error retrieving suggestions.');
    }
  };

  const generateJiraIssues = async () => {
    if (!aiSuggestions) {
      alert("No AI suggestions available to process.");
      return;
    }
  
    const lines = aiSuggestions
      .split('\n')
      .map(line => line.trim())
      .filter(line => /^\[?(Task|Bug|Story|Epic)\]?/i.test(line));
  
    if (lines.length === 0) {
      alert("No valid JIRA-formatted suggestions found.");
      return;
    }
  
    for (const line of lines) {
      const typeMatch = line.match(/\[(Task|Bug|Story|Epic)\]/);
      const summaryMatch = line.match(/\]\s*(.+?)(:|$)/);
  
      if (!typeMatch || !summaryMatch) continue;
  
      const issueType = typeMatch[1];
      const summary = summaryMatch[1].trim();
      const description = line.split(':').slice(1).join(':').trim();
  
      try {
        const res = await fetch('/api/create-issue', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            projectKey,
            summary,
            description,
            issuetype: issueType,
          }),
        });
  
        const result = await res.json();
        console.log(`✅ Created ${issueType}:`, result.key || result);
      } catch (err) {
        console.error('❌ Failed to create JIRA issue:', err);
      }
    }
  };

  return (
    <div className="jira-dashboard">
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

      <hr />

      <h3>💡 AI Suggestions</h3>
      <div className="button-row">
        <button onClick={fetchAISuggestions}>Generate AI Insights</button>
        <button onClick={generateJiraIssues} style={{ marginLeft: '1rem' }}>Auto Generate JIRA Issues</button>
      </div>

      {aiSuggestions && (
        <div className="ai-suggestions">
          <pre>{aiSuggestions}</pre>
        </div>
      )}
    </div>
  );
};

export default JiraDashboard;
