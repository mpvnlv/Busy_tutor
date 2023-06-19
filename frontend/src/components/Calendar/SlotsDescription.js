
import { TimeSlotDescription } from './TimeSlotDescription';
import React from 'react';

export const SlotsDescription = () => {
    const slots = ["NO SLOT", "FREE", "BOOKED"];
    const colors = ["bg-slot_no", "bg-slot_free", "bg-booked_normal"];

  return (
    <div className="flex flex-col items-center mt-4">
      {slots.map((slot, index) => {
        return (
          <div key={index} className="flex flex-col items-center mx-8 mb-10 ">
            <TimeSlotDescription
              color={colors[index]}
            />
            <p className="mt-2">{slot}</p>
          </div>
        );
      })}
    </div>
  );
};
