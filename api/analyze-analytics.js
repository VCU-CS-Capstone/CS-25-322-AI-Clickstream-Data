// /api/analyze-analytics.js

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { analyticsData, question } = req.body;

    if (!analyticsData || !analyticsData.rows) {
      console.error('❌ Missing or malformed analytics data');
      return res.status(400).json({ error: 'Missing or malformed analytics data' });
    }

    const dataSnippet = JSON.stringify(analyticsData.rows.slice(0, 10), null, 2); // limit to 10 rows to speed up
    const prompt = question
      ? `You are a helpful assistant. Based on the following Google Analytics data:\n${dataSnippet}\n\nAnswer the question: "${question}"`
      : `You are a web analytics assistant. Based on this Google Analytics data:\n${dataSnippet}\n\nProvide 5 website improvement suggestions labeled clearly as [Task], [Bug], [Story], or [Epic]. Format each suggestion as a single line starting with the label.`;

    console.log('📤 Prompt being sent to OpenAI:\n', prompt);

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const output = completion.choices[0]?.message?.content;

    if (!output) {
      console.error('⚠️ Invalid response from OpenAI:', completion);
      return res.status(500).json({ error: 'OpenAI returned an invalid response' });
    }

    console.log('✅ OpenAI suggestions generated successfully');
    res.status(200).json({ suggestions: output });

  } catch (err) {
    const fullError = err.response?.data || err.message || err;
    console.error('❌ OpenAI API error:', fullError);
    res.status(500).json({ error: 'AI analysis failed', detail: fullError });
  }
}
