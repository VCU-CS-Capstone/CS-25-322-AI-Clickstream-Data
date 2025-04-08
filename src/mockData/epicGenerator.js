// 📁 src/mockData/epicGenerator.js
import { createIssue } from '../api/jiraAPI.js';

const sampleTitles = [
  'Improve Dashboard Performance',
  'Refactor Search Bar Logic',
  'Auto-Respond to FAQs',
  'Link Help Topics to JIRA',
  'Add Personalization to UI'
];

export const generateMockEpics = async (projectKey, count = 3) => {
  const created = [];
  for (let i = 0; i < count; i++) {
    const summary = sampleTitles[i % sampleTitles.length] + ` (Mock Epic #${i + 1})`;
    const description = 'Auto-generated epic from accepted recommendation.';
    const epic = await createIssue(projectKey, summary, description, 'Epic');
    if (epic) created.push(epic);
  }
  return created;
};
