// 📁 src/components/CreateIssueForm.js
import React, { useState } from 'react';
import { createIssue, updateIssue } from '../utils/jiraAPI.js';

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  border: '2px solid #0a2d5d',
  borderRadius: '10px',
  fontSize: '1rem',
  boxSizing: 'border-box'
};

const CreateIssueForm = ({ projectKey }) => {
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [issueType, setIssueType] = useState('Task');
  const [updatingKey, setUpdatingKey] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (updatingKey) {
      await updateIssue(updatingKey, { summary, description });
      alert(`Updated issue: ${updatingKey}`);
    } else {
      const issue = await createIssue(projectKey, summary, description, issueType);
      alert(`Created issue: ${issue?.key || 'unknown'}`);
    }
    setSummary('');
    setDescription('');
    setUpdatingKey('');
  };

  return (
    <div className="create-issue-container">
      <h2 className="bottom-banner-title">{updatingKey ? 'Update Issue' : 'Create New Issue'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Summary"
          required
          className="form-input"
          style={inputStyle}
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
          className="form-input"
          style={inputStyle}
        ></textarea>

        {!updatingKey && (
          <select
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
            className="form-input"
            style={inputStyle}
          >
            <option value="Task">Task</option>
            <option value="Bug">Bug</option>
            <option value="Story">Story</option>
            <option value="Epic">Epic</option>
          </select>
        )}

        <input
          type="text"
          placeholder="Issue Key to Update (optional)"
          value={updatingKey}
          onChange={(e) => setUpdatingKey(e.target.value)}
          className="form-input"
          style={inputStyle}
        />

        <button type="submit" className="primary-btn">
          {updatingKey ? 'Update' : 'Create'} Issue
        </button>
      </form>
    </div>
  );
};

export default CreateIssueForm;
