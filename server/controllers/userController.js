const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userController = {
  // Register a new user
  async register(req, res, next) {
    try {
      const { username, email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({
        $or: [{ email }, { username }]
      });

      if (existingUser) {
        return res.status(400).json({
          message: 'User with this email or username already exists'
        });
      }

      // Create new user
      const user = new User({
        username,
        email,
        password
      });

      await user.save();

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          preferences: user.preferences
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // Login user
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          message: 'Invalid email or password'
        });
      }

      // Check password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({
          message: 'Invalid email or password'
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          preferences: user.preferences
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // Get user profile
  async getProfile(req, res, next) {
    try {
      const user = await User.findById(req.user._id).select('-password');
      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  // Update user preferences
  async updatePreferences(req, res, next) {
    try {
      const { theme, personality } = req.body;
      const user = await User.findById(req.user._id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.preferences.theme = theme || user.preferences.theme;
      user.preferences.personality = personality || user.preferences.personality;

      await user.save();
      res.json({
        preferences: user.preferences
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = userController; 