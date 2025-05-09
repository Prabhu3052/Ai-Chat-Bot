require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const authRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const { errorHandler } = require('./middlewares/errorHandler');

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'https://ai-chat-bot-xi-vert.vercel.app/',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Error handling
app.use(errorHandler);

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join', (room) => {
    socket.join(room);
    console.log(`Client joined room: ${room}`);
  });

  socket.on('message', (data) => {
    io.to(data.room).emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 