import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { tutorService } from '../../services/tutorService';
import { availabilityService, sessionService } from '../../services/sessionService';
import { fetchClasses, fetchSubjectsByCourse } from '../../features/register/registerSlice';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const TutorProfile = () => {
  const { tutorId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { subjects, classes } = useSelector((state) => state.register);
  const subject_id = location.state?.subject_id || '';
  const [tutor, setTutor] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availabilityRange, setAvailabilityRange] = useState(null);
  const [slots, setSlots] = useState([]);
  const [bookingData, setBookingData] = useState({
    subject_id,
    requested_date: '',
    requested_time: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [showClassMismatchConfirm, setShowClassMismatchConfirm] = useState(false);

  useEffect(() => {
    dispatch(fetchClasses());

    if (user?.course_id) {
      dispatch(fetchSubjectsByCourse(user.course_id));
    }
  }, [dispatch, user?.course_id]);

  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const [tutorRes, availabilityRes] = await Promise.all([
          tutorService.getTutorDetails(tutorId),
          availabilityService.getTutorSlots(tutorId),
        ]);

        const availabilityData = availabilityRes.data?.slots
          ? availabilityRes.data
          : availabilityRes.data?.data || availabilityRes.data || {};

        setTutor(tutorRes.data.tutor);
        setAvailability(availabilityData.slots || []);
        setAvailabilityRange(availabilityData.range || null);
      } catch (error) {
        console.error('Error fetching tutor data:', error);
        toast.error('Failed to load tutor details');
      } finally {
        setLoading(false);
      }
    };

    fetchTutorData();
  }, [tutorId]);
  useEffect(() => {
    if (!tutor) {
      return;
    }

    if (tutor.subject_id) {
      setBookingData((prev) => {
        const tutorSubjectId = String(tutor.subject_id);

        if (String(prev.subject_id) === tutorSubjectId) {
          return prev;
        }

        return {
          ...prev,
          subject_id: tutorSubjectId,
        };
      });

      return;
    }

    if (subjects.length === 0) {
      return;
    }

    const normalizeSubjectName = (value) =>
      String(value || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();

    const tutorSubjectValues = [
      tutor.subject_name,
      tutor.subjects,
      tutor.subject,
    ]
      .filter(Boolean)
      .flatMap((value) => String(value).split(/[,/|&]/))
      .map(normalizeSubjectName)
      .filter(Boolean);

    const matchingSubjects = subjects.filter((subject) => {
      const normalizedName = normalizeSubjectName(subject.subject_name);

      return tutorSubjectValues.some(
        (tutorSubject) =>
          tutorSubject === normalizedName ||
          tutorSubject.includes(normalizedName) ||
          normalizedName.includes(tutorSubject)
      );
    });

    if (matchingSubjects.length === 0) {
      return;
    }

    setBookingData((prev) => {
      const hasValidSelection = matchingSubjects.some(
        (subject) => String(subject.id) === String(prev.subject_id)
      );

      if (hasValidSelection) {
        return prev;
      }

      return {
        ...prev,
        subject_id: String(matchingSubjects[0].id),
      };
    });
  }, [subjects, tutor]);

  const handleDateChange = async (event) => {
    const selectedDate = event.target.value;

    setBookingData((prev) => ({
      ...prev,
      requested_date: selectedDate,
      requested_time: '',
    }));

    if (!selectedDate) {
      return;
    }

    try {
      const res = await availabilityService.getAvailableSlotsByDate(
        tutorId,
        selectedDate
      );

      setSlots(res.data.slots || []);
    } catch (error) {
      console.error('Error fetching slots:', error);
      setSlots([]);
    }
  };

  const handleInputChange = (event) => {
    setBookingData({
      ...bookingData,
      [event.target.name]: event.target.value,
    });
  };

  const submitBooking = async (parsedSubjectId) => {
    setSubmitting(true);

    try {
      const requestData = {
        tutor_id: parseInt(tutorId, 10),
        subject_id: parsedSubjectId,
        requested_date: bookingData.requested_date,
        requested_time: bookingData.requested_time,
        notes: bookingData.notes,
      };

      console.log("subject_id",parsedSubjectId);
console.log("course_id",user.course_id);
console.log("tutor_subject_id",tutor.subject_id);

      await sessionService.createSessionRequest(requestData);
      toast.success('Session request sent successfully!');
      navigate('/student/sessions');
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error?.response?.data?.message || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBooking = async (event) => {
    event.preventDefault();

    const parsedSubjectId = Number(bookingData.subject_id);

    if (!Number.isFinite(parsedSubjectId) || parsedSubjectId <= 0) {
      toast.error('Please choose a subject before booking a session');
      return;
    }

    if (!bookingData.requested_time) {
      toast.error('Please select a time slot');
      return;
    }

    if (hasClassMismatch) {
      setShowClassMismatchConfirm(true);
      return;
    }

    await submitBooking(parsedSubjectId);
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!tutor) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Tutor not found</h2>
        <Button onClick={() => navigate('/student/dashboard')} className="mt-4">
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const formatDateForInput = (dateStr) => {
    if (!dateStr) {
      return '';
    }

    const date = new Date(dateStr);

    if (Number.isNaN(date.getTime())) {
      return '';
    }

    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);

    return localDate.toISOString().split('T')[0];
  };

  const formatDate = (dateStr) => {
    const inputDate = formatDateForInput(dateStr);

    if (!inputDate) {
      return '';
    }

    return new Date(`${inputDate}T00:00:00`).toLocaleDateString('hi-IN');
  };

  const getDaysLabel = (availabilitySlots) => {
    const uniqueDays = [...new Set(availabilitySlots.map((slot) => slot.day_of_week))];

    if (uniqueDays.length === 7) {
      return 'Mon - Sun';
    }

    return uniqueDays.join(', ');
  };

  const getCommonTimeString = (availabilitySlots) => {
    const uniqueTimes = [
      ...new Set(
        availabilitySlots.map(
          (slot) => `${slot.start_time.slice(0, 5)} - ${slot.end_time.slice(0, 5)}`
        )
      ),
    ];

    return uniqueTimes.join(', ');
  };

  const normalizeSubjectName = (value) =>
    String(value || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();

  const tutorSubjectValues = [
    tutor.subject_name,
    tutor.subjects,
    tutor.subject,
  ]
    .filter(Boolean)
    .flatMap((value) => String(value).split(/[,/|&]/))
    .map(normalizeSubjectName)
    .filter(Boolean);

  const matchedTutorSubjects = subjects.filter((subject) => {
    const normalizedName = normalizeSubjectName(subject.subject_name);

    if (tutor.subject_id) {
      return String(subject.id) === String(tutor.subject_id);
    }

    if (tutorSubjectValues.length > 0) {
      return tutorSubjectValues.some(
        (tutorSubject) =>
          tutorSubject === normalizedName ||
          tutorSubject.includes(normalizedName) ||
          normalizedName.includes(tutorSubject)
      );
    }

    return false;
  });

  const bookingSubjectOptions =
    tutor.subject_id && matchedTutorSubjects.length === 0
      ? [
          {
            value: tutor.subject_id,
            label: tutor.subject_name || tutor.subjects || `Subject ID: ${tutor.subject_id}`,
          },
        ]
      : matchedTutorSubjects.map((subject) => ({
          value: subject.id,
          label: subject.subject_name,
        }));

  const studentClass = classes.find((item) => String(item.id) === String(user?.class_id));
  const studentClassLabel = studentClass?.class_name || user?.class_name || '';
  const tutorClassValues = String(tutor.classes || tutor.class_name || '')
    .split(/[,/|&]/)
    .map((value) => value.trim())
    .filter(Boolean);
  const tutorClassLabel = tutorClassValues.join(', ');
  const hasClassMismatch =
    Boolean(studentClassLabel) &&
    tutorClassValues.length > 0 &&
    !tutorClassValues.some((value) => value.toLowerCase() === String(studentClassLabel).toLowerCase());
  const today = formatDateForInput(new Date());
  const availabilityStartDate = formatDateForInput(availabilityRange?.start_date);
  const availabilityEndDate = formatDateForInput(availabilityRange?.end_date);
  const minBookingDate =
    availabilityStartDate && availabilityStartDate > today ? availabilityStartDate : today;

  return (
    <div>
      <Button
        variant="outline"
        onClick={() => navigate('/student/dashboard')}
        className="mb-6"
      >
        Back to Search
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{tutor.full_name}</h1>
                <p className="text-gray-600 mt-1">{tutor.email}</p>
              </div>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Verified
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-600">Experience</p>
                <p className="text-lg font-semibold">{tutor.experience_years} years</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Hourly Rate</p>
                <p className="text-lg font-semibold text-blue-600">Rs {tutor.hourly_rate}</p>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-gray-700">{tutor.bio || 'No bio available'}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Education</h3>
              <p className="text-gray-700">{tutor.education || 'Not specified'}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Subjects</h3>
              <p className="text-gray-700">{tutor.subjects || 'Not specified'}</p>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Availability Calendar</h2>

            {availability.length === 0 ? (
              <p className="text-gray-600">No availability slots set by tutor</p>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {availabilityRange
                        ? `${formatDate(availabilityRange.start_date)} to ${formatDate(availabilityRange.end_date)}`
                        : getDaysLabel(availability)}
                    </p>

                    {availabilityRange && (
                      <p className="text-xs text-slate-500">{getDaysLabel(availability)}</p>
                    )}
                  </div>

                  <p className="text-sm text-slate-700">{getCommonTimeString(availability)}</p>
                </div>
              </div>
            )}
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Book a Session</h2>

            {hasClassMismatch && (
              <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                This tutor mainly teaches {tutorClassLabel} class students. You are in {studentClassLabel}. You can still continue with booking.
              </div>
            )}

            <form onSubmit={handleBooking}>
              <Input
                label="Preferred Date"
                type="date"
                name="requested_date"
                value={bookingData.requested_date}
                onChange={handleDateChange}
                required
                min={minBookingDate}
                max={availabilityEndDate || undefined}
              />

              <Select
                label="Subject"
                name="subject_id"
                value={bookingData.subject_id}
                onChange={handleInputChange}
                options={bookingSubjectOptions}
                required
                disabled={bookingSubjectOptions.length <= 1}
                placeholder="Select subject"
              />

              {bookingData.requested_date && (
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {slots.length === 0 ? (
                    <p className="text-sm text-gray-500 col-span-3">No slots available</p>
                  ) : (
                    slots.map((slot) => {
                      const slotTime = slot.time || slot.start_time?.slice(0, 5) || '';
                      const hasSeats =
                        slot.available_seats === undefined || Number(slot.available_seats) > 0;
                      const isSelectable =
                        typeof slot.is_selectable === 'boolean'
                          ? slot.is_selectable
                          : !slot.booked && hasSeats;

                      return (
                        <button
                          key={slot.id || slotTime}
                          type="button"
                          disabled={!isSelectable}
                          onClick={() =>
                            setBookingData((prev) => ({
                              ...prev,
                              requested_time: slotTime,
                            }))
                          }
                          className={`px-3 py-2 rounded border text-sm ${
                            !isSelectable
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : bookingData.requested_time === slotTime
                                ? 'bg-blue-600 text-white'
                                : 'bg-white hover:bg-blue-50'
                          }`}
                        >
                          {slotTime}
                          {slot.available_seats !== undefined && (
                            <div className="text-xs">{slot.available_seats} left</div>
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={bookingData.notes}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Any specific topics or questions?"
                />
              </div>

              <Button type="submit" fullWidth loading={submitting}>
                Send Request
              </Button>
            </form>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> You can explore this tutor and their slots first, then send a request once you have chosen a subject.
              </p>
            </div>
          </Card>
        </div>
      </div>

      {showClassMismatchConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">Class mismatch</h3>
            <p className="mt-3 text-sm text-gray-600">
              This tutor mainly teaches {tutorClassLabel} class students. You are in {studentClassLabel}. Do you want to continue with this booking?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => setShowClassMismatchConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                loading={submitting}
                onClick={async () => {
                  setShowClassMismatchConfirm(false);
                  await submitBooking(Number(bookingData.subject_id));
                }}
              >
                Continue Booking
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorProfile;
