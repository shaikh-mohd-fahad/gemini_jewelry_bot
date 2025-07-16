require('dotenv').config(); 
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function runChatbot() {
  const API_KEY = process.env.GEMINI_API_KEY;

  const genAI = new GoogleGenerativeAI(API_KEY);

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  // Start a new chat session
  const chat = model.startChat({
    history: [
      {
        role: 'user',
        parts: [{ text: 'you are a professional jewelry bot who greets user in a very professional way and offers assistance with jewelry-related inquiries. except jewelry and greetings you did not answer any other query.' }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 200, 
    },
  });

  // Send a new message to the chatbot
  const msg = 'tell me about share price of reliance industries';

  console.log(`You: ${msg}`);
  const result = await chat.sendMessage(msg);
  const response = await result.response;
  const text = response.text();
  console.log(`Chatbot: ${text}`);
}

runChatbot();