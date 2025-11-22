# Backend Email API

Simple Express server for sending emails via Resend.

## Setup

1. **Create `.env` file:**
```bash
cp .env.example .env
```

2. **Add your Resend API key to `.env`:**
```
RESEND_API_KEY=re_your_actual_api_key_here
PORT=3001
```

3. **Install dependencies:**
```bash
npm install
```

4. **Start the server:**
```bash
npm run dev
```

The server will run on `http://localhost:3001`

## API Endpoints

### POST `/api/send-email`
Send an email via Resend.

**Request Body:**
```json
{
  "to": "email@example.com",
  "subject": "Email Subject",
  "html": "<h1>HTML content</h1>",
  "text": "Plain text content"
}
```

**Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

## Development

The frontend is configured to use `http://localhost:3001` by default.
If you change the port, update `VITE_API_URL` in the frontend `.env` file.

