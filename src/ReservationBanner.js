import React from 'react';

function ReservationBanner({userName, reservationItems})
{
    return (
        <h4 className="bg-primary text-white text-center p-2">
            { userName }'s Reservation List
            ({ reservationItems.filter(t => !t.done).length } items reservations)
        </h4>
    );
}

export default ReservationBanner;