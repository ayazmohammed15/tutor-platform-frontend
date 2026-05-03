import { useEffect, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const GoogleConnected = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const status = searchParams.get('status');
  const message = useMemo(
    () => searchParams.get('message') || 'Unable to connect Google Calendar. Please try again.',
    [searchParams]
  );
  const isSuccess = status === 'success';

  useEffect(() => {
    if (!isSuccess) return undefined;

    if (window.opener) {
      window.opener.postMessage({ type: 'GOOGLE_AUTH_SUCCESS' }, window.location.origin);
    }

    const timer = window.setTimeout(() => {
      navigate('/tutor/dashboard', {
        replace: true,
        state: { refreshGoogleStatus: true },
      });
    }, 2000);

    return () => window.clearTimeout(timer);
  }, [isSuccess, navigate]);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center px-4">
      <div className="w-full rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm">
        <div
          className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${
            isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {isSuccess ? <CheckCircle2 className="h-8 w-8" /> : <AlertCircle className="h-8 w-8" />}
        </div>

        <h1 className="mt-5 text-2xl font-bold text-gray-900">
          {isSuccess ? 'Google Calendar Connected Successfully!' : 'Google Calendar Connection Failed'}
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          {isSuccess ? 'Taking you back to your dashboard...' : message}
        </p>

        {!isSuccess && (
          <Link
            to="/tutor/dashboard"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Back to Dashboard
          </Link>
        )}
      </div>
    </div>
  );
};

export default GoogleConnected;
