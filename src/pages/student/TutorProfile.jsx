import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tutorService } from '../../services/tutorService';
import { availabilityService } from '../../services/sessionService';
import { sessionService } from '../../services/sessionService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

const TutorProfile = () => {
  const { tutorId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const subject_id = location.state?.subject_id;
  const class_id = location.state?.class_id;
  const course_id = location.state?.course_id;
  // const chapter_ids = location.state?.chapter_ids || [];
  const [tutor, setTutor] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  //   const [selectedClassId, setSelectedClassId] = useState(class_id || null);
  // const [selectedCourseId, setSelectedCourseId] = useState(course_id || null);
  const selectedClassId = Number(class_id);
  const selectedCourseId = Number(course_id);
  const parsedSubjectId = Number(subject_id);
  const [slots, setSlots] = useState([]);
  const [bookingData, setBookingData] = useState({
    requested_date: '',
    requested_time: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTutorData();
  }, [tutorId]);

  useEffect(() => {
    if (!subject_id || !class_id || !course_id) {
      toast.error("Missing booking data. Please search again.");
      navigate("/student/dashboard");
    }
  }, []);

  const fetchTutorData = async () => {
    try {
      const [tutorRes, availabilityRes] = await Promise.all([
        tutorService.getTutorDetails(tutorId),
        availabilityService.getTutorSlots(tutorId),
      ]);

      setTutor(tutorRes.data.tutor);
      setAvailability(availabilityRes.data.slots);
    } catch (error) {
      console.error('Error fetching tutor data:', error);
      toast.error('Failed to load tutor details');
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = async (e) => {
    const selectedDate = e.target.value;

    setBookingData(prev => ({
      ...prev,
      requested_date: selectedDate,
      requested_time: ''
    }));

    if (!selectedDate) return;

    try {
      const res = await availabilityService.getAvailableSlotsByDate(
        tutorId,
        selectedDate
      );

      console.log("API RESPONSE:", res); // check this once

      setSlots(res.data.slots || []);
    } catch (error) {
      console.error("Error fetching slots:", error);
      setSlots([]);
    }
  };

  const handleInputChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!Number.isFinite(parsedSubjectId) || parsedSubjectId <= 0) {
      toast.error('Please select a subject before booking a session');
      return;
    }

    if (!bookingData.requested_time) {
      toast.error('Please select a time slot');
      return;
    }

    setSubmitting(true);

    try {
      const requestData = {
        tutor_id: parseInt(tutorId),
        subject_id: parsedSubjectId,
        class_id: selectedClassId,     // ✅ ADD
        course_id: selectedCourseId,   // ✅ ADD
        requested_date: bookingData.requested_date,
        requested_time: bookingData.requested_time,
        notes: bookingData.notes,
      };

      await sessionService.createSessionRequest(requestData);
      toast.success('Session request sent successfully!');
      navigate('/student/sessions');
    } catch (error) {
      console.error('Booking error:', error);
      alert(
        error?.response?.data?.message || 'Booking failed'
      );
      toast.error(
        error?.response?.data?.message || 'Booking failed'
      );
    } finally {
      setSubmitting(false);
    }
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

  const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const groupedAvailability = availability.reduce((acc, slot) => {
    if (!acc[slot.day_of_week]) {
      acc[slot.day_of_week] = [];
    }
    acc[slot.day_of_week].push(slot);
    return acc;
  }, {});

  return (
    <div>
      <Button
        variant="outline"
        onClick={() => navigate('/student/dashboard')}
        className="mb-6"
      >
        ← Back to Search
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
                <p className="text-lg font-semibold text-blue-600">₹{tutor.hourly_rate}</p>
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

          <Card>
            <h2 className="text-2xl font-semibold mb-4">Availability Calendar</h2>

            {availability.length === 0 ? (
              <p className="text-gray-600">No availability slots set by tutor</p>
            ) : (
              <div className="space-y-4">
                {dayOrder.map((day) => {
                  const slots = groupedAvailability[day];
                  if (!slots) return null;

                  return (
                    <div key={day} className="border-b pb-3 last:border-b-0">
                      <h4 className="font-semibold text-gray-900 mb-2">{day}</h4>
                      <div className="flex flex-wrap gap-2">
                        {slots.map((slot) => (
                          <div
                            key={slot.id}
                            className="bg-blue-50 text-blue-700 px-3 py-1 rounded text-sm"
                          >
                            {slot.start_time.slice(0, 5)} - {slot.end_time.slice(0, 5)}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Book a Session</h2>

            <form onSubmit={handleBooking}>
              <Input
                label="Preferred Date"
                type="date"
                name="requested_date"
                value={bookingData.requested_date}
                onChange={handleDateChange}
                required
                min={new Date().toISOString().split('T')[0]}
              />

              {bookingData.requested_date && (
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {slots.length === 0 ? (
                    <p className="text-sm text-gray-500 col-span-3">
                      No slots available
                    </p>
                  ) : (
                    slots.map((slot) => {
                      const slotTime = slot.time || slot.start_time?.slice(0, 5) || "";
                      const hasSeats = slot.available_seats === undefined || Number(slot.available_seats) > 0;
                      const isSelectable =
                        typeof slot.is_selectable === "boolean"
                          ? slot.is_selectable
                          : !slot.booked && hasSeats;

                      return (
                        <button
                          key={slot.id || slotTime}
                          type="button"
                          disabled={!isSelectable}
                          onClick={() =>
                            setBookingData(prev => ({
                              ...prev,
                              requested_time: slotTime
                            }))
                          }
                          className={`px-3 py-2 rounded border text-sm
    ${!isSelectable
                              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                              : bookingData.requested_time === slotTime
                                ? "bg-blue-600 text-white"
                                : "bg-white hover:bg-blue-50"
                            }
  `}
                        >
                          {slotTime}
                          {slot.available_seats !== undefined && (
                            <div className="text-xs">
                              {slot.available_seats} left
                            </div>
                          )}
                        </button>
                    )})
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
                <strong>Note:</strong> Your request will be sent to the tutor for approval.
                You can make payment once the tutor accepts your request.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;
