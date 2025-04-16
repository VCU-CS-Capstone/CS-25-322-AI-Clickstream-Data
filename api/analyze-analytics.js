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

    // ✅ Trim the analytics data to reduce payload size
    const trimmedAnalytics = {
      headers: analyticsData.headers,
      rows: analyticsData.rows?.slice(0, 5) || []
    };

    console.log(`📊 Trimmed analytics size: ${JSON.stringify(trimmedAnalytics).length} characters`);

    const prompt = question
      ? `You are a web analytics assistant. Based on the following Google Analytics data, answer the question:\n\n"${question}"\n\nAnalytics Sample:\n${JSON.stringify(trimmedAnalytics, null, 2)}`
      : `You are a web analytics assistant. Based on the following Google Analytics data, generate improvement suggestions and create JIRA task recommendations. Label suggestions with [Task], [Bug], [Story], or [Epic].\n\nAnalytics Sample:\n${JSON.stringify(trimmedAnalytics, null, 2)}`;

    console.log('📤 Prompt sent to OpenAI:\n', prompt);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const output = completion.choices[0]?.message?.content;

    if (!output) {
      console.error('⚠️ Unexpected OpenAI response:', completion);
      return res.status(500).json({ error: 'OpenAI returned an invalid response format' });
    }

    console.log('✅ OpenAI suggestions generated successfully');
    res.status(200).json({ suggestions: output });

  } catch (err) {
    const fullError = err.response?.data || err.message || err;
    console.error('❌ OpenAI API error:', fullError);
    res.status(500).json({ error: 'AI analysis failed', detail: fullError });
  }
}
