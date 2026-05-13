
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  ExternalLink,
  Inbox,
  Link as LinkIcon,
  Mail,
} from 'lucide-react';
import { sessionService } from '../../services/sessionService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const TutorSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [requests, setRequests] = useState([]); 
  const [loading, setLoading] = useState(true);

  const fetchAllData = useCallback(async () => {
    try {
      const sessionRes = await sessionService.getMySessions();
      const requestRes = await sessionService.getMyRequests();

      setSessions(sessionRes.data?.sessions || sessionRes.sessions || []);
      setRequests(requestRes.data?.requests || requestRes.requests || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load sessions');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const pendingRequests = useMemo(
    () => requests.filter((request) => request.status === 'pending'),
    [requests]
  );

  const paidSessions = useMemo(
    () => sessions.filter((session) => session.status === 'paid').length,
    [sessions]
  );

  const formatDate = (date) => {
    if (!date) return 'Not scheduled';

    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return 'Not scheduled';

    return parsedDate.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = (time) => (time ? String(time).slice(0, 5) : '--:--');

  const getStatusClasses = (status) => {
    const styles = {
      paid: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      confirmed: 'bg-blue-50 text-blue-700 border-blue-100',
      pending: 'bg-amber-50 text-amber-700 border-amber-100',
      cancelled: 'bg-red-50 text-red-700 border-red-100',
      completed: 'bg-gray-100 text-gray-700 border-gray-200',
    };

    return styles[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const stats = [
    {
      label: 'Total Sessions',
      value: sessions.length,
      icon: CalendarDays,
      color: 'bg-blue-50 text-blue-700 border-blue-100',
    },
    {
      label: 'Paid Sessions',
      value: paidSessions,
      icon: CheckCircle2,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    },
    {
      label: 'Pending Requests',
      value: pendingRequests.length,
      icon: Inbox,
      color: 'bg-amber-50 text-amber-700 border-amber-100',
    },
  ];

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Tutor schedule</p>
        <h1 className="mt-1 text-3xl font-bold text-gray-950">My Sessions</h1>
        <p className="mt-2 text-sm text-gray-500">
          Review student requests, upcoming paid classes, and meeting links in one place.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div key={stat.label} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="mt-2 text-2xl font-bold text-gray-950">{stat.value}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg border ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {pendingRequests.length > 0 && (
        <section className="overflow-hidden rounded-xl border border-amber-100 bg-white shadow-sm">
          <div className="border-b border-amber-100 bg-amber-50/60 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-amber-700 shadow-sm">
                <Inbox className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-950">Pending requests</h2>
                <p className="text-sm text-gray-600">New session requests waiting for your response.</p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {pendingRequests.map((req) => (
              <div key={req.id} className="grid gap-4 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-gray-950">Request from {req.student_name || 'Student'}</h3>
                    <span className="rounded-full border border-amber-100 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                      Awaiting approval
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-4 w-4" />
                      {formatDate(req.requested_date)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {formatTime(req.requested_time)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {sessions.length === 0 ? (
        <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-gray-100 bg-white px-6 text-center shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 text-gray-500">
            <CalendarDays className="h-8 w-8" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-gray-950">No sessions yet</h2>
          <p className="mt-2 max-w-md text-sm text-gray-500">
            Confirmed and paid sessions will appear here once students book with you.
          </p>
        </div>
      ) : (
        <section className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <div>
              <h2 className="font-semibold text-gray-950">Confirmed sessions</h2>
              <p className="text-sm text-gray-500">Compact view of student, timing, status, and class link.</p>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="grid gap-4 px-5 py-4 transition hover:bg-gray-50 lg:grid-cols-[minmax(220px,1.1fr)_minmax(220px,1fr)_auto] lg:items-center"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">
                    {(session.student_name || 'S').charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-gray-950">
                      {session.student_name || 'Student'}
                    </h3>
                    {session.student_email && (
                      <p className="mt-1 flex min-w-0 items-center gap-1.5 text-sm text-gray-500">
                        <Mail className="h-4 w-4 shrink-0" />
                        <span className="truncate">{session.student_email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Date</p>
                    <p className="mt-1 text-sm font-semibold text-gray-900">{formatDate(session.scheduled_date)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Time</p>
                    <p className="mt-1 text-sm font-semibold text-gray-900">{formatTime(session.scheduled_time)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Duration</p>
                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {session.duration_minutes || 0} min
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${getStatusClasses(session.status)}`}>
                    {session.status || 'scheduled'}
                  </span>

                  {session.status === 'paid' && session.zoom_meeting_link ? (
                    <a
                      href={session.zoom_meeting_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Join
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3.5 py-2 text-sm font-medium text-gray-500">
                      <LinkIcon className="h-4 w-4" />
                      No link
                    </span>
                  )}
                </div>

                {session.zoom_password && (
                  <div className="rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600 lg:col-start-2 lg:col-end-4">
                    Password: <span className="font-mono font-semibold text-gray-900">{session.zoom_password}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default TutorSessions;
