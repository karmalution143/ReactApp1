import './App.css';
import React, { useState, useEffect } from "react";
import ReservationBanner from './ReservationBanner';
import ReservationCreator from './ReservationCreator';
import ReservationRow from './ReservationRow';
import VisibilityControl from './VisibilityControl';

function App() {
  const [userName] = useState("Tiffany");

  const [reservationItems, setReservationItems] = useState([
    { area: "Green Valley", timeSlot: "9:00am - 12:00pm", done: false },
    { area: "Blue Lake", timeSlot: "12:00pm - 3:00pm", done: true },
    { area: "Red Hill", timeSlot: "3:00pm - 6:00pm", done: false },
    { area: "Yellow Forest", timeSlot: "9:00am - 12:00pm", done: false },
  ]);

  const [showCompleted, setShowCompleted] = useState(true);

  const createNewReservation = (area, timeSlot) => {
    if (!reservationItems.find((item) => item.area === area && item.timeSlot === timeSlot)) {
      const updatedReservations = [
        ...reservationItems,
        { area, timeSlot, done: false },
      ];
      setReservationItems(updatedReservations);
      localStorage.setItem("reservations", JSON.stringify(updatedReservations));
    }
  };

  const toggleReservation = (reservation) => {
    const updatedReservations = reservationItems.map((item) =>
      item.area === reservation.area && item.timeSlot === reservation.timeSlot
        ? { ...item, done: !item.done }
        : item
    );
    setReservationItems(updatedReservations);
    localStorage.setItem("reservations", JSON.stringify(updatedReservations));
  };

  const reservationTableRows = (doneValue) =>
    reservationItems
      .filter((item) => item.done === doneValue)
      .map((item) => (
        <ReservationRow
          key={`${item.area}-${item.timeSlot}`}
          item={item}
          toggle={toggleReservation}
        />
      ));

  useEffect(() => {
    try {
      const data = localStorage.getItem("reservations");
      if (data) {
        const parsedData = JSON.parse(data);
        if (Array.isArray(parsedData)) {
          setReservationItems(parsedData);
        }
      }
    } catch (error) {
      console.error("Failed to load reservations:", error);
    }
  }, []); // Runs only once after the initial render

  return (
    <div>
      <ReservationBanner userName={userName} reservationItems={reservationItems} />

      <div className="m-3">
        <ReservationCreator callback={createNewReservation} />
      </div>

      <div className="container-fluid">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Conservation Area</th>
              <th>Time Slot</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
            {reservationTableRows(false)}
          </tbody>
        </table>

        <div className="bg-secondary text-white text-center p-2">
          <VisibilityControl
            description="Completed Reservations"
            isChecked={showCompleted}
            callback={(checked) => setShowCompleted(checked)}
          />
        </div>

        {showCompleted && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Conservation Area</th>
                <th>Time Slot</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              {reservationTableRows(true)}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
