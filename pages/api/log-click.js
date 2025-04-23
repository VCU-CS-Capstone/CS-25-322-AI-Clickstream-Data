export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const {
        sessionId,
        buttonName,
        subtopicName,
        clickTime }
        = req.body;
        
    // Optional: basic logging
    console.log('🔹 Log Click Event:', {
      sessionId,
      buttonName,
      subtopicName,
      clickTime,
    });
  
    // You can optionally store this in a DB later
    return res.status(200).json({ message: 'Click logged' });
  }
  