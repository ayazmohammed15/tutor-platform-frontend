import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { CheckCircle2, RefreshCw } from 'lucide-react';
import useGoogleStatus from '../hooks/useGoogleStatus';

const GoogleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 48 48" aria-hidden="true">
    <path
      fill="#FFC107"
      d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
    />
    <path
      fill="#FF3D00"
      d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.2 4 9.5 8.4 6.3 14.7z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.1 0 9.8-1.9 13.3-5.1l-6.2-5.2C29.1 35.1 26.6 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.4 39.5 16.1 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"
    />
  </svg>
);

const GoogleCalendarSkeleton = () => (
  <div className="animate-pulse space-y-5">
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-3">
        <div className="h-5 w-56 rounded bg-gray-200" />
        <div className="h-4 w-72 max-w-full rounded bg-gray-100" />
      </div>
      <div className="h-10 w-10 rounded-xl bg-gray-100" />
    </div>
    <div className="h-11 w-52 rounded-xl bg-gray-200" />
  </div>
);

const getGoogleAuthUrl = (token) => {
  return `http://localhost:5000/api/auth/google?token=${token}`;
};

const GoogleCalendarConnect = () => {
  const { isConnected, loading, error, refetch } = useGoogleStatus();
  const popupRef = useRef(null);

  useEffect(() => {
    const handleOAuthMessage = (event) => {
      if (event.origin !== window.location.origin) return;

      if (event.data?.type === 'GOOGLE_AUTH_SUCCESS') {
        toast.success('Google Calendar Connected');
        refetch();

        if (popupRef.current && !popupRef.current.closed) {
          popupRef.current.close();
        }
      }
    };

    window.addEventListener('message', handleOAuthMessage);

    return () => {
      window.removeEventListener('message', handleOAuthMessage);
    };
  }, [refetch]);

  const handleConnect = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('Please sign in again before connecting Google Calendar.');
      return;
    }

    const authUrl = getGoogleAuthUrl(token);
    console.log('Opening Google Auth URL:', authUrl);

    popupRef.current = window.open(
      authUrl,
      'googleAuth',
      'width=500,height=600'
    );

    if (!popupRef.current) {
      alert('Popup blocked! Please allow popups.');
    }
  };

  return (
    <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
      {loading ? (
        <GoogleCalendarSkeleton />
      ) : (
        <div className="space-y-5 animate-in fade-in duration-300">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Google Calendar Integration</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                Connect your calendar so accepted tutoring sessions can stay in sync with your schedule.
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <GoogleIcon />
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-red-100 bg-red-50 p-4">
              <p className="text-sm font-medium text-red-700">{error}</p>
              <button
                type="button"
                onClick={refetch}
                className="mt-3 inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
              >
                <RefreshCw className="h-4 w-4" />
                Retry
              </button>
            </div>
          )}

          {!error && isConnected && (
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                <CheckCircle2 className="h-4 w-4" />
                Google Calendar Connected
              </span>
              <button
                type="button"
                disabled
                className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white opacity-70"
              >
                Connected
              </button>
            </div>
          )}

          {!error && !isConnected && (
            <button
              type="button"
              onClick={handleConnect}
              className="inline-flex items-center gap-3 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <GoogleIcon />
              Connect Google Calendar
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default GoogleCalendarConnect;
