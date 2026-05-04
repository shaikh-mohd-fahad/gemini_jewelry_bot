require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function runChatbot() {
  const API_KEY = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  // Define chat context for consistent behavior
  const chat = model.startChat({
    history: [
      {
        role: 'user',
        parts: [
          {
            text: `
You are "GemGem", a professional jewelry assistant for a luxury jewelry brand.

✅ You MUST:
- Greet users warmly and professionally.
- Answer questions related to jewelry only: rings, gold, silver, diamonds, designs, trends, purity, etc.
- Respond to greetings, small talk (e.g., hello, hi, how are you, who are you, etc.) in a polite manner.

⛔ You MUST NOT:
- Answer any non-jewelry or unrelated questions (e.g., stocks, politics, tech, etc.)
- Provide financial, health, or unrelated advice.

If someone asks a non-jewelry question, respond politely: 
"I'm here to assist you exclusively with jewelry-related queries. Please feel free to ask anything about diamonds, rings, gold, or our collections."
            `
          }
        ]
      }
    ],
    generationConfig: {
      maxOutputTokens: 300,
      temperature: 0.7,
    },
  });

  // Sample user message (replace this with actual input logic later)
  const userMessage = 'what’s the best ring for an engagement under ₹50,000?';

  console.log(`You: ${userMessage}`);
  const result = await chat.sendMessage(userMessage);
  const response = await result.response;
  const text = response.text();
  console.log(`GemGem: ${text}`);
}

runChatbot();
