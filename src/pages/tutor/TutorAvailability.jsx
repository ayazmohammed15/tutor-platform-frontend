import { useState } from "react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import toast from "react-hot-toast";
import api from "../../services/api";

const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

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

      await api.post("/availability/save", payload);

      toast.success("Availability saved successfully");
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
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                workingDays.includes(day)
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
              className={`px-6 py-3 rounded-lg font-medium transition ${
                slotType === d
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