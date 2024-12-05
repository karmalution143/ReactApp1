import React, { useState } from "react";

function ReservationCreator({ callback }) {
  const [area, setArea] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const timeSlots = [
    "9:00am - 12:00pm",
    "12:00pm - 3:00pm",
    "3:00pm - 6:00pm"
  ];

  const handleSubmit = () => {
    if (area && timeSlot) {
      callback(area, timeSlot);
      setArea("");
      setTimeSlot("");
    }
  };

  return (
    <div className="my-3">
      <input
        type="text"
        className="form-control"
        placeholder="Conservation Area"
        value={area}
        onChange={(e) => setArea(e.target.value)}
      />
      <select
        className="form-control mt-2"
        value={timeSlot}
        onChange={(e) => setTimeSlot(e.target.value)}
      >
        <option value="">Select Time Slot</option>
        {timeSlots.map((slot) => (
          <option key={slot} value={slot}>
            {slot}
          </option>
        ))}
      </select>
      <button className="btn btn-primary mt-2" onClick={handleSubmit}>
        Add Reservation
      </button>
    </div>
  );
}

export default ReservationCreator;
