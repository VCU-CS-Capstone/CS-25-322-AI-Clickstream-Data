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

    if (!analyticsData) {
      console.error('❌ Missing analyticsData in request body');
      return res.status(400).json({ error: 'Missing analytics data' });
    }

    const prompt = question
      ? `Based on this Google Analytics data:\n${JSON.stringify(analyticsData, null, 2)}\n\nAnswer the question: "${question}"`
      : `Based on this Google Analytics data:\n${JSON.stringify(analyticsData, null, 2)}\n\nGenerate website improvement suggestions and create JIRA task recommendations (label them [Task], [Bug], [Story], or [Epic]).`;

    console.log('📤 Prompt being sent to OpenAI:\n', prompt);

    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const output = completion?.data?.choices?.[0]?.message?.content;

    if (!output) {
      console.error('⚠️ Unexpected OpenAI response:', completion?.data);
      return res.status(500).json({ error: 'OpenAI returned invalid response format' });
    }

    console.log('✅ OpenAI suggestions generated successfully');
    res.status(200).json({ suggestions: output });

  } catch (err) {
    const fullError = err.response?.data || err.message || err;
    console.error('❌ OpenAI API error:', fullError);
    res.status(500).json({ error: 'AI analysis failed', detail: fullError });
  }
}
