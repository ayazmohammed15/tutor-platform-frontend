import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tutorService } from '../../services/tutorService';
import { sessionService } from '../../services/sessionService';
import api from '../../services/api';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const TutorProfile = () => {
  const { tutorId } = useParams();
  const navigate = useNavigate();

  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('');

  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTutor();
  }, [tutorId]);

  const fetchTutor = async () => {
    try {
      const res = await tutorService.getTutorDetails(tutorId);
      setTutor(res.data.tutor);
    } catch (err) {
      toast.error('Failed to load tutor');
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Fetch Slots When Date Changes ---------------- */
  const fetchSlots = async (date) => {
    if (!date) return;

    setSlotsLoading(true);
    setAvailableSlots([]);
    setSelectedSlot('');

    try {
      const res = await api.get(
        `/availability/tutor/${tutorId}/date/${date}`
      );

      setAvailableSlots(res.data.data.slots);
    } catch (err) {
      setAvailableSlots([]);
      toast.error(
        err.response?.data?.message || 'No availability for this date'
      );
    } finally {
      setSlotsLoading(false);
    }
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    fetchSlots(date);
  };

  /* ---------------- Booking ---------------- */
  const handleBooking = async (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedSlot) {
      toast.error('Select date and time slot');
      return;
    }

    setSubmitting(true);

    try {
      await sessionService.createSessionRequest({
        tutor_id: parseInt(tutorId),
        requested_date: selectedDate,
        requested_time: selectedSlot,
        notes,
      });

      toast.success('Session request sent!');
      navigate('/student/sessions');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner fullScreen />;

  if (!tutor) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-bold">Tutor not found</h2>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">

      {/* LEFT SIDE - Tutor Info */}
      <div className="lg:col-span-2">
        <Card>
          <h1 className="text-3xl font-bold">{tutor.full_name}</h1>
          <p className="text-gray-600">{tutor.email}</p>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Experience</p>
              <p className="font-semibold">{tutor.experience_years} years</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Rate</p>
              <p className="font-semibold text-blue-600">
                ₹{tutor.hourly_rate}/hour
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">About</h3>
            <p>{tutor.bio}</p>
          </div>
        </Card>
      </div>

      {/* RIGHT SIDE - Booking */}
      <div>
        <Card>
          <h2 className="text-xl font-semibold mb-4">Book Session</h2>

          <form onSubmit={handleBooking} className="space-y-4">

            {/* Date */}
            <Input
              type="date"
              label="Select Date"
              value={selectedDate}
              onChange={handleDateChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />

            {/* Slots */}
            {slotsLoading && <LoadingSpinner />}

            {availableSlots.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Available Time Slots
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {availableSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`px-3 py-2 rounded border text-sm transition ${
                        selectedSlot === slot
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 hover:bg-blue-100'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedDate && !slotsLoading && availableSlots.length === 0 && (
              <p className="text-sm text-gray-500">
                No slots available for this date
              </p>
            )}

            {/* Notes */}
            <textarea
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional notes..."
              className="w-full border rounded-lg px-3 py-2"
            />

            <Button type="submit" fullWidth loading={submitting}>
              Send Request
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default TutorProfile;
