const { getModel } = require('../config/gemini');
const Chat = require('../models/Chat');
const { PERSONALITIES } = require('../utils/constants');

const chatController = {
  // Get all chats for a user
  async getChats(req, res, next) {
    try {
      const chats = await Chat.find({ userId: req.user._id })
        .sort({ updatedAt: -1 })
        .select('-__v');
      res.json(chats);
    } catch (error) {
      next(error);
    }
  },

  // Get a specific chat
  async getChat(req, res, next) {
    try {
      const chat = await Chat.findOne({
        _id: req.params.id,
        userId: req.user._id
      }).select('-__v');
      
      if (!chat) {
        return res.status(404).json({ message: 'Chat not found' });
      }
      res.json(chat);
    } catch (error) {
      next(error);
    }
  },

  // Create a new chat
  async createChat(req, res, next) {
    try {
      const { title, personality } = req.body;
      
      if (!PERSONALITIES[personality]) {
        return res.status(400).json({ 
          message: 'Invalid personality type',
          validOptions: Object.keys(PERSONALITIES)
        });
      }

      const chat = new Chat({
        userId: req.user._id,
        title: title || `New Chat - ${new Date().toLocaleString()}`,
        personality: personality || 'friendly',
        messages: []
      });

      await chat.save();
      
      const chatResponse = chat.toObject();
      delete chatResponse.__v;
      
      res.status(201).json(chatResponse);
    } catch (error) {
      next(error);
    }
  },

  // Send a message and get AI response
  async sendMessage(req, res, next) {
    try {
      const { chatId, content } = req.body;
      
      if (!content || typeof content !== 'string' || content.trim() === '') {
        return res.status(400).json({ message: 'Message content is required' });
      }

      const chat = await Chat.findOne({
        _id: chatId,
        userId: req.user._id
      });

      if (!chat) {
        return res.status(404).json({ message: 'Chat not found' });
      }

      // Add user message to chat
      const userMessage = {
        role: 'user',
        content: content.trim()
      };
      chat.messages.push(userMessage);

      // Get personality data
      const personalityData = PERSONALITIES[chat.personality] || PERSONALITIES.friendly;
      
      // Create conversation history (only actual messages, no system instruction)
      const conversationHistory = chat.messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      // Generate response from Gemini
      const model = getModel();
      const chatSession = model.startChat({
        history: conversationHistory,
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.9,
          topP: 0.9,
          topK: 40
        },
        // System instruction goes here, not in history
        systemInstruction: {
          parts: [{ text: personalityData.prompt }],
          role: 'model'
        }
      });

      const result = await chatSession.sendMessage(content);
      const aiResponse = await result.response.text();

      // Add AI response to chat
      chat.messages.push({
        role: 'assistant',
        content: aiResponse
      });

      chat.updatedAt = new Date();
      await chat.save();
      
      const response = chat.toObject();
      delete response.__v;
      
      res.json(response);
    } catch (error) {
      console.error('Gemini API Error:', error);
      
      // Improved error handling
      if (error.message.includes('API key not valid')) {
        return res.status(401).json({ 
          message: 'Invalid Gemini API key',
          code: 'INVALID_API_KEY'
        });
      }
      if (error.message.includes('safety')) {
        return res.status(422).json({ 
          message: 'Content blocked by safety filters',
          code: 'CONTENT_BLOCKED'
        });
      }
      if (error.message.includes('429')) {
        return res.status(429).json({ 
          message: 'Rate limit exceeded',
          code: 'RATE_LIMIT',
          retryAfter: '60s'
        });
      }
      if (error.message.includes('model')) {
        return res.status(400).json({
          message: 'Invalid message format',
          code: 'INVALID_MESSAGE_FORMAT',
          details: 'First message must be from user'
        });
      }
      
      next(error);
    }
  },

  // Delete a chat
  async deleteChat(req, res, next) {
    try {
      const chat = await Chat.findOneAndDelete({
        _id: req.params.id,
        userId: req.user._id
      });
      
      if (!chat) {
        return res.status(404).json({ message: 'Chat not found' });
      }
      
      res.json({ 
        success: true,
        message: 'Chat deleted successfully',
        deletedChatId: req.params.id
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = chatController;