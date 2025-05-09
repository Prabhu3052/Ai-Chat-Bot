# Creative MERN Chatbot

A full-stack chatbot application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring customizable personalities, themes, and chat history.

## Features

- 🤖 Multiple AI personalities to choose from
- 🎨 Customizable themes and UI
- 💬 Real-time chat interface
- 📝 Chat history and persistence
- 🔐 User authentication
- ⚙️ Settings management

## Project Structure

```
mern-chatbot/
├── client/          # React frontend
├── server/          # Node.js backend
├── .gitignore
└── README.md
```

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_uri
   OPENAI_API_KEY=your_openai_api_key
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the development servers:
   ```bash
   # Start the backend server
   cd server
   npm run dev

   # Start the frontend development server
   cd ../client
   npm start
   ```

## Technologies Used

- Frontend: React, Material-UI, Axios
- Backend: Node.js, Express.js, MongoDB
- Authentication: JWT
- AI Integration: OpenAI API
- Styling: CSS Modules, Theme Provider

## License

MIT 