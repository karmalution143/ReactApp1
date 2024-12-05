import './App.css';
import React, { useState, useEffect } from "react";
import ReservationBanner from './ReservationBanner';
import ReservationCreator from './ReservationCreator';
import ReservationRow from './ReservationRow';
import VisibilityControl from './VisibilityControl';

function App() {
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