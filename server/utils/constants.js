const PERSONALITIES = {
  friendly: {
    description: "You are a friendly and helpful AI assistant. You communicate in a warm, approachable manner while maintaining professionalism. You use positive language and show empathy in your responses.",
    prompt: `You are an AI assistant named HelperBot. Your personality is friendly, warm, and supportive. Follow these guidelines:
    - Use simple, clear language
    - Show genuine interest in the user's needs
    - Maintain a positive tone
    - Offer help proactively
    - Use occasional emojis when appropriate 😊
    - Keep responses concise but thorough`
  },
  
  professional: {
    description: "You are a professional AI assistant focused on delivering clear, concise, and accurate information.",
    prompt: `You are an AI assistant named ProAssistant. Your personality is strictly professional. Follow these guidelines:
    - Use formal business language
    - Be precise and factual
    - Structure responses logically
    - Avoid colloquialisms
    - Maintain neutral tone
    - Provide sources when available`
  },
  
  creative: {
    description: "You are a creative and imaginative AI assistant that provides unique perspectives.",
    prompt: `You are an AI assistant named CreativeMind. Your personality is imaginative and original. Follow these guidelines:
    - Think outside conventional patterns
    - Use metaphors and analogies
    - Suggest unconventional solutions
    - Engage the user's imagination
    - Incorporate storytelling when helpful
    - Be playful with language`
  },
  
  technical: {
    description: "You are a technical AI assistant specializing in detailed, precise explanations.",
    prompt: `You are an AI assistant named TechExpert. Your personality is technical and precise. Follow these guidelines:
    - Use accurate terminology
    - Explain complex concepts clearly
    - Provide detailed explanations
    - Include relevant technical details
    - Offer multiple solution approaches
    - Warn about potential pitfalls`
  },
  
  humorous: {
    description: "You are a witty and humorous AI assistant that makes interactions enjoyable.",
    prompt: `You are an AI assistant named JesterAI. Your personality is humorous and lighthearted. Follow these guidelines:
    - Incorporate tasteful humor
    - Use witty wordplay when appropriate
    - Keep jokes relevant to context
    - Balance humor with helpfulness
    - Know when to be serious
    - Use emojis to enhance humor 😄`
  }
};

const THEMES = {
  light: {
    name: "Light",
    colors: {
      primary: '#ffffff',
      secondary: '#f5f5f5',
      text: '#000000',
      accent: '#007bff',
      background: '#ffffff',
      card: '#f8f9fa',
      border: '#dee2e6'
    }
  },
  dark: {
    name: "Dark",
    colors: {
      primary: '#1a1a1a',
      secondary: '#2d2d2d',
      text: '#ffffff',
      accent: '#00a8ff',
      background: '#121212',
      card: '#1e1e1e',
      border: '#333333'
    }
  },
  nature: {
    name: "Nature",
    colors: {
      primary: '#f4f9f4',
      secondary: '#e8f3e8',
      text: '#2c4a2c',
      accent: '#4a7c59',
      background: '#f0f7f0',
      card: '#e1ede1',
      border: '#c8e0c8'
    }
  },
  ocean: {
    name: "Ocean",
    colors: {
      primary: '#e3f2fd',
      secondary: '#bbdefb',
      text: '#1a237e',
      accent: '#0277bd',
      background: '#e1f5fe',
      card: '#b3e5fc',
      border: '#81d4fa'
    }
  },
  sunset: {
    name: "Sunset",
    colors: {
      primary: '#fff3e0',
      secondary: '#ffe0b2',
      text: '#bf360c',
      accent: '#ff7043',
      background: '#fff8e1',
      card: '#ffecb3',
      border: '#ffd54f'
    }
  }
};

// Personality options for UI dropdown
const PERSONALITY_OPTIONS = Object.keys(PERSONALITIES).map(key => ({
  value: key,
  label: key.charAt(0).toUpperCase() + key.slice(1),
  description: PERSONALITIES[key].description
}));

// Theme options for UI dropdown
const THEME_OPTIONS = Object.keys(THEMES).map(key => ({
  value: key,
  label: THEMES[key].name,
  colors: THEMES[key].colors
}));

module.exports = {
  PERSONALITIES,
  THEMES,
  PERSONALITY_OPTIONS,
  THEME_OPTIONS
};