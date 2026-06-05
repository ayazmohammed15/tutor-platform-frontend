# TutorBook Frontend

A modern, responsive React frontend for the Student-Tutor Booking Platform built with Vite, React Router, and Tailwind CSS.

## Features

### For Students
- Search tutors by class, chapter, and topic
- View tutor profiles with availability calendar
- Send session booking requests
- Make payments via Razorpay
- Receive Zoom meeting links after payment
- Track all sessions and their status

### For Tutors
- Receive and manage session requests
- Accept, reject, or suggest alternate dates
- View all sessions and student information
- Get payment confirmations

### For Admins
- Review and approve tutor applications
- Manage platform access

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Tailwind CSS** - Utility-first CSS framework
- **React Hot Toast** - Toast notifications
- **Razorpay** - Payment integration

## Installation

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

### 3. Start development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Environment Variables

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

For production, this Vite app must use `VITE_API_BASE_URL`, not `REACT_APP_API_URL`.

Example:

```env
VITE_API_BASE_URL=https://your-backend-domain.com/api
VITE_PAYMENT_MODE=live
```

## Frontend Deployment Notes

1. Create a `.env` file in the project root and point `VITE_API_BASE_URL` to your deployed backend API.
2. Build the frontend with `npm run build`.
3. Upload the generated `dist/` folder to your hosting for the frontend domain.
4. Make sure the backend CORS configuration allows your frontend domain.

The frontend already:

- Stores the JWT token in `localStorage`
- Sends `Authorization: Bearer <token>` automatically through the shared Axios client
- Calls backend routes through `src/services/api.js`

If you change the backend domain later, update only `VITE_API_BASE_URL` and rebuild the frontend.

## License

MIT
