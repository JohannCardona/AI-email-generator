# AI Email Generator

A full-stack application that generates email drafts using AI (Claude by Anthropic). The app consists of a React TypeScript frontend and a Node.js Express backend.

## Project Structure

```
AI-email-generator/
├── backend/                    # Backend API server
│   ├── src/
│   │   ├── config/            # Environment configuration
│   │   ├── controllers/       # Request handlers
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic (AI integration)
│   │   ├── types/             # TypeScript types
│   │   └── server.ts          # Express server entry point
│   ├── .env.example           # Environment variables template
│   ├── package.json
│   └── tsconfig.json
│
└── my-react-ts-app/           # Frontend React app
    ├── src/
    │   ├── components/        # React components
    │   │   ├── DraftCard.tsx
    │   │   ├── DraftsList.tsx
    │   │   └── EmailForm.tsx
    │   ├── constants/         # App constants
    │   ├── services/          # API service layer
    │   ├── types/             # TypeScript types
    │   ├── utils/             # Utility functions
    │   ├── App.tsx            # Main app component
    │   └── main.tsx
    ├── .env.example           # Environment variables template
    └── package.json
```

## Features

- Generate 3 different email drafts from a description
- Choose between different tones (Professional, Friendly, Formal)
- Copy generated drafts to clipboard
- Clean, modular architecture with separation of concerns
- Type-safe with TypeScript
- RESTful API backend

## Setup

### 1. Backend Setup

```bash
cd backend
npm install

# Create .env file from example
cp .env.example .env

# Add your Anthropic API key to .env
# ANTHROPIC_API_KEY=your_actual_api_key_here
```

### 2. Frontend Setup

```bash
cd my-react-ts-app
npm install

# Create .env file from example (optional)
cp .env.example .env
```

## Running the Application

### Development Mode

You need to run both the backend and frontend servers:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
cd my-react-ts-app
npm run dev
```
The frontend will run on `http://localhost:5173`

### Production Build

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd my-react-ts-app
npm run build
npm run preview
```

## API Documentation

### POST /api/email/generate

Generate email drafts based on description and tone.

**Request:**
```json
{
  "description": "Need to decline a meeting invitation politely",
  "tone": "professional"
}
```

**Response:**
```json
{
  "drafts": [
    {
      "subject": "Re: Meeting Request",
      "body": "Dear [Name],\n\nThank you for..."
    },
    {
      "subject": "Unable to Attend Meeting",
      "body": "Hi [Name],\n\nI appreciate..."
    },
    {
      "subject": "Schedule Conflict",
      "body": "Hello [Name],\n\nUnfortunately..."
    }
  ]
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-19T12:00:00.000Z"
}
```

## Technologies Used

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)

### Backend
- Node.js
- Express
- TypeScript
- Anthropic SDK
- CORS

## Environment Variables

### Backend (.env)
- `ANTHROPIC_API_KEY` - Your Anthropic API key (required)
- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `CORS_ORIGIN` - Allowed frontend origin (default: http://localhost:5173)

### Frontend (.env)
- `VITE_API_BASE_URL` - Backend API URL (default: http://localhost:3001)

## License

MIT