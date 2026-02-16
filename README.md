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

## License

MIT
