import { TimeSlotBooking } from "./TimeSlotBooking";

export const Timeslots = () => {
  const timeslots = Array.from({ length: 24*7 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-7 grid-rows-auto w-full ml-6 mt-4 rounded-sm border-header_border">
      {timeslots.map((timeslot) => (
        <TimeSlotBooking/>
      ))}
    </div>
  );
};
