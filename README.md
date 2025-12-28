# QuickGPT

A full-stack AI-powered chat application built with Express.js and React, featuring real-time conversations, credit system, and user authentication.

## ✨ Features

- **AI Chat**: Powered by OpenAI API for intelligent conversations
- **User Authentication**: Secure login and user management
- **Credit System**: Token-based credit system for API usage
- **Real-time Messaging**: Send and receive messages with chat history
- **Image Support**: ImageKit integration for image uploads and processing
- **Community**: Share and discover conversations
- **Responsive UI**: Mobile-friendly interface with Vite + React

## 🛠️ Tech Stack

### Frontend

- **Framework**: React + Vite
- **Styling**: CSS
- **HTTP Client**: Axios (implied)
- **Linting**: ESLint

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via db config)
- **Authentication**: JWT (via auth middleware)
- **AI Integration**: OpenAI API
- **Image Storage**: ImageKit
- **Deployment**: Vercel

## 🚀 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB account and connection string
- OpenAI API key
- ImageKit account credentials

### Backend Setup

```bash
cd backend
npm install
```

### Frontend Setup

```bash
cd frontend
npm install
```

## ⚙️ Configuration

### Backend Configuration Files

1. **db.js** - Configure your MongoDB connection
2. **openai.js** - Set up OpenAI API credentials
3. **imageKit.js** - Configure ImageKit for image uploads

### Frontend Configuration

Update [vite.config.js](frontend/vite.config.js) if needed for your build setup.

## 🏃 Running the Application

### Development Mode

**Backend**:

```bash
cd backend
npm run server
```

Server runs on `http://localhost:5000` (or configured port)

**Frontend**:

```bash
cd frontend
npm run dev
```

App runs on `http://localhost:5173` (Vite default)

### Production Build

**Frontend**:

```bash
cd frontend
npm run build
```

## 🔌 API Endpoints

### User Routes

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile

### Chat Routes

- `GET /api/chats` - Get all chats
- `POST /api/chats` - Create a new chat
- `GET /api/chats/:id` - Get specific chat
- `PUT /api/chats/:id` - Update chat
- `DELETE /api/chats/:id` - Delete chat

### Message Routes

- `GET /api/messages/:chatId` - Get messages for a chat
- `POST /api/messages` - Send a message

### Credit Routes

- `GET /api/credits/balance` - Get credit balance
- `POST /api/credits/purchase` - Purchase credits
- `POST /api/webhooks` - Handle credit purchase webhooks

## 🔐 Environment Variables

Create a `.env` file in the backend root with:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# ImageKit
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

# JWT
JWT_SECRET=your_jwt_secret_key

# Server
PORT=5000
NODE_ENV=development
```

## 📝 License

This project is private and proprietary.

## 👨‍💻 Author

[Yash Patel]

---

**Happy Coding!** 🚀
