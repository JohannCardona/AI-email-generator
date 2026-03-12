# Email Generator Backend

Backend API service for the AI Email Generator application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Add your Anthropic API key to the `.env` file:
```
ANTHROPIC_API_KEY=your_actual_api_key_here
```

## Development

Run the development server with hot reload:
```bash
npm run dev
```

The server will start on `http://localhost:3001`

## Production

Build the TypeScript code:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## API Endpoints

### POST /api/email/generate
Generate email drafts based on description and tone.

**Request Body:**
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
      "subject": "...",
      "body": "..."
    },
    {
      "subject": "...",
      "body": "..."
    },
    {
      "subject": "...",
      "body": "..."
    }
  ]
}
```

### GET /health
Health check endpoint to verify the server is running.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-19T12:00:00.000Z"
}
```
