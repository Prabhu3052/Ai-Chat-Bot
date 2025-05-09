const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Get model instance
const getModel = () => {
  return genAI.getGenerativeModel({ model: "gemini-pro" });
};

module.exports = {
  genAI,
  getModel
};