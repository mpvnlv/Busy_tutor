import { useState } from "react";

export const TimeSlotBooking = () => {
  const slots = ["NO SLOT", "FREE", "BOOKED"];
  const colors = ["bg-slot_no", "bg-slot_free", "bg-booked_normal"];

  const [count, setCount ] = useState(0)
 
  return (
    <div className="group p-1 border-header_border border-2 relative">
      <div
        onClick={() => {
          setCount(count + 1);
        }}
        className={`pb-20 hover:bg-no_slot_hover hover:cursor-pointer rounded-md  ${colors[count]}`}
      ></div>
      <div
        className="flex flex-col justify-center items-center  absolute -top-14 -right-28 group-hover:visible invisible  bg-white border-booked_clicked border-2 py-4 px-10 z-20
    rounded-tl-lg rounded-tr-lg rounded-br-lg text-booked_clicked"
      >
        <p className="z-30">KOSHMANOVA</p>
        <p className="z-30">EKATERINA</p>
        <p className="z-30">8 (910) 165-73-78</p>
      </div>
    </div>
  );
};
