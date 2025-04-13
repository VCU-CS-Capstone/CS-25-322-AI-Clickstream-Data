// 📁 src/components/CreateIssueForm.js
import React, { useState } from 'react';
import { createIssue, updateIssue } from '../utils/jiraAPI.js';

const CreateIssueForm = ({ projectKey }) => {
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [issueType, setIssueType] = useState('Task');
  const [updatingKey, setUpdatingKey] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (updatingKey) {
      await updateIssue(updatingKey, { summary, description }); // ✅ fixed here
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
    <div>
      <h3>{updatingKey ? 'Update Issue' : 'Create New Issue'}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Summary"
          required
        />
        <br />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        ></textarea>
        <br />
        {!updatingKey && (
          <select value={issueType} onChange={(e) => setIssueType(e.target.value)}>
            <option value="Task">Task</option>
            <option value="Bug">Bug</option>
            <option value="Story">Story</option>
            <option value="Epic">Epic</option>
          </select>
        )}
        <br />
        <input
          type="text"
          placeholder="Issue Key to Update (optional)"
          value={updatingKey}
          onChange={(e) => setUpdatingKey(e.target.value)}
        />
        <br />
        <button type="submit">{updatingKey ? 'Update' : 'Create'} Issue</button>
      </form>
    </div>
  );
};

export default CreateIssueForm;
