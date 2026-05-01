import { useState, useEffect } from "react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import toast from "react-hot-toast";
import { availabilityService } from "../../services/sessionService";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const TutorAvailability = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [workingDays, setWorkingDays] = useState([]);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");

  const [breakStart, setBreakStart] = useState("");
  const [breakEnd, setBreakEnd] = useState("");

  const [slotType, setSlotType] = useState(60);
  const [excludedDates, setExcludedDates] = useState([]);
  const [currentAvailability, setCurrentAvailability] = useState([]);
  const [availabilityRange, setAvailabilityRange] = useState({ start: "", end: "" });

  const normalizeAvailability = (value) => {
    if (Array.isArray(value)) return value;
    if (!value) return [];
    if (Array.isArray(value.slots)) return value.slots;
    if (Array.isArray(value.data?.slots)) return value.data.slots;
    if (Array.isArray(value.data)) return value.data;
    return [];
  };

  const groupSlotsByDay = (slots) => {
    return slots.reduce((grouped, slot) => {
      const day = slot.day_of_week || slot.day || "Other";
      if (!grouped[day]) grouped[day] = [];
      grouped[day].push(slot);
      return grouped;
    }, {});
  };

  const getCommonTimeString = (slots) => {
    const uniqueTimes = Array.from(
      new Set(
        slots.map((slot) => `${slot.start_time.slice(0, 5)} - ${slot.end_time.slice(0, 5)}`)
      )
    );
    return uniqueTimes.join(", ");
  };

  const getDaysLabel = (slots) => {
    const uniqueDays = Array.from(
      new Set(slots.map((slot) => slot.day_of_week || slot.day || "Other"))
    );
    if (uniqueDays.length >= 7) {
      return "Mon - Sun";
    }
    return uniqueDays.join(", ");
  };

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await availabilityService.getMySlots();
        const normalized = normalizeAvailability(res);
        setCurrentAvailability(normalized);

        const rangeData = res?.data?.availability_range || res?.availability_range;
        const start = rangeData?.start_date || res?.start_date || res?.data?.start_date || "";
        const end = rangeData?.end_date || res?.end_date || res?.data?.end_date || "";
        if (start || end) {
          setAvailabilityRange({
            start: start ? new Date(start).toISOString().split('T')[0] : "",
            end: end ? new Date(end).toISOString().split('T')[0] : ""
          });
        }
      } catch (err) {
        console.error("Failed to load availability", err);
      }
    };

    fetchAvailability();
  }, []);

  /* ---------------- Working Days ---------------- */
  const toggleDay = (day) => {
    if (workingDays.includes(day)) {
      setWorkingDays(workingDays.filter((d) => d !== day));
    } else {
      setWorkingDays([...workingDays, day]);
    }
  };

  /* ---------------- Excluded Dates ---------------- */
  const addExcludedDate = (date) => {
    if (!date) return;
    if (!excludedDates.includes(date)) {
      setExcludedDates([...excludedDates, date]);
    }
  };

  const removeExcludedDate = (date) => {
    setExcludedDates(excludedDates.filter((d) => d !== date));
  };

  /* ---------------- Save ---------------- */
  const saveAvailability = async () => {
    if (!startDate || !endDate) {
      toast.error("Select availability range");
      return;
    }
    if (workingDays.length === 0) {
      toast.error("Select at least one working day");
      return;
    }

    if (!startTime || !endTime) {
      toast.error("Select working hours");
      return;
    }
    try {
      let blocks = [];

      if (breakStart && breakEnd) {
        blocks = [
          {
            start_time: startTime,
            end_time: breakStart,
            slot_duration: slotType,
          },
          {
            start_time: breakEnd,
            end_time: endTime,
            slot_duration: slotType,
          },
        ];
      } else {
        blocks = [
          {
            start_time: startTime,
            end_time: endTime,
            slot_duration: slotType,
          },
        ];
      }

      const payload = {
        start_date: startDate,
        end_date: endDate,
        weekly_schedule: workingDays.map((day) => ({
          day,
          blocks,
        })),
        excluded_dates: excludedDates,
      };

      const res = await availabilityService.saveAvailability(payload);

      toast.success("Availability saved successfully");
      
      // Refetch availability to update the display
      const updatedRes = await availabilityService.getMySlots();
      const normalized = normalizeAvailability(updatedRes);
      setCurrentAvailability(normalized);

      const rangeData = updatedRes?.data?.availability_range || updatedRes?.availability_range;
      const start = rangeData?.start_date || updatedRes?.start_date || updatedRes?.data?.start_date || "";
      const end = rangeData?.end_date || updatedRes?.end_date || updatedRes?.data?.end_date || "";
      if (start || end) {
        setAvailabilityRange({ 
          start: start ? (typeof start === 'string' && start.includes('T') ? new Date(start).toISOString().split('T')[0] : start) : "", 
          end: end ? (typeof end === 'string' && end.includes('T') ? new Date(end).toISOString().split('T')[0] : end) : "" 
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to save availability");
    }
  };

  return (
    <div className="space-y-10">

      <h2 className="text-3xl font-bold text-gray-800">
        Set Your Availability
      </h2>

      <Card className="p-6">
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="text-xl font-semibold">Current Availability</h3>
            <p className="text-sm text-gray-500">
              Review your saved availability before adding or updating time blocks.
            </p>
          </div>

          {currentAvailability.length === 0 ? (
            <p className="text-gray-600">No availability has been set yet.</p>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-500">
                    {availabilityRange.start && availabilityRange.end
                      ? `${availabilityRange.start} → ${availabilityRange.end}`
                      : getDaysLabel(normalizeAvailability(currentAvailability))}
                  </p>
                  {availabilityRange.start && availabilityRange.end && (
                    <p className="text-xs text-slate-500">
                      {getDaysLabel(normalizeAvailability(currentAvailability))}
                    </p>
                  )}
                </div>
                <p className="text-sm text-slate-700">
                  {getCommonTimeString(normalizeAvailability(currentAvailability))}
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* 1️⃣ Month Range */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6">
          1. Availability Period
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <Input
            type="date"
            label="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <Input
            type="date"
            label="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </Card>

      {/* 2️⃣ Working Days */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6">
          2. Working Days
        </h3>

        <div className="flex flex-wrap gap-3">
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${workingDays.includes(day)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
                }`}
            >
              {day}
            </button>
          ))}
        </div>
      </Card>

      {/* 3️⃣ Working Hours */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6">
          3. Working Hours
        </h3>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Input
            type="time"
            label="Start Time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <Input
            type="time"
            label="End Time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <h4 className="font-medium mb-3">Optional Break</h4>

        <div className="grid md:grid-cols-2 gap-6">
          <Input
            type="time"
            label="Break Start"
            value={breakStart}
            onChange={(e) => setBreakStart(e.target.value)}
          />

          <Input
            type="time"
            label="Break End"
            value={breakEnd}
            onChange={(e) => setBreakEnd(e.target.value)}
          />
        </div>
      </Card>

      {/* 4️⃣ Slot Duration */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6">
          4. Slot Duration
        </h3>

        <div className="flex gap-4">
          {[30, 60].map((d) => (
            <button
              key={d}
              onClick={() => setSlotType(d)}
              className={`px-6 py-3 rounded-lg font-medium transition ${slotType === d
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
                }`}
            >
              {d} Minutes
            </button>
          ))}
        </div>
      </Card>

      {/* 5️⃣ Excluded Dates */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6">
          5. Unavailable Dates
        </h3>

        <Input
          type="date"
          onChange={(e) => addExcludedDate(e.target.value)}
        />

        <div className="flex flex-wrap gap-3 mt-5">
          {excludedDates.map((date) => (
            <span
              key={date}
              className="bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {date}
              <button onClick={() => removeExcludedDate(date)}>
                ✕
              </button>
            </span>
          ))}
        </div>
      </Card>

      <Button onClick={saveAvailability} fullWidth>
        Save Availability
      </Button>
    </div>
  );
};

export default TutorAvailability;