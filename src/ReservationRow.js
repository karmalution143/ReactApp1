import React from 'react';

function ReservationRow({ item, toggle }) {

  const onToggle = () => {
    toggle(item);
  };

  return (
    <tr>
      <td>{ item.area }</td>
      <td>{ item.timeSlot }</td>
      <td>
        <input
          type="checkbox"
          checked={ item.done }
          onChange={ onToggle }
        />
      </td>
    </tr>
  );
}

export default ReservationRow;
