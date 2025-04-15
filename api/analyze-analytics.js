import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { analyticsData, question } = req.body;

  if (!analyticsData) {
    console.error('❌ Missing analyticsData in request body');
    return res.status(400).json({ error: 'Missing analytics data' });
  }

  try {
    console.log('📊 Received analyticsData:', analyticsData);
  
    const prompt = question
      ? `Based on this Google Analytics data:\n${JSON.stringify(analyticsData, null, 2)}\n\nAnswer the question: "${question}"`
      : `Based on this Google Analytics data:\n${JSON.stringify(analyticsData, null, 2)}\n\nGenerate website improvement suggestions and create JIRA task recommendations (label them [Task], [Bug], [Story], or [Epic]).`;
  
    console.log('📤 Sending prompt to OpenAI...');
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });
  
    const output = completion.data.choices[0].message.content;
    console.log('✅ Received OpenAI suggestions');
    res.status(200).json({ suggestions: output });
  } catch (err) {
    const safeError = err.response?.data || err.message || 'Unknown error';
    console.error('❌ OpenAI error:', safeError);
    res.status(500).json({ error: safeError });
  }
}
