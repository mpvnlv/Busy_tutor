
import { Days } from "../../components/Calendar/Days";
import { Time } from "../../components/Calendar/Time";
import { Timeslots } from "../../components/Calendar/TimeSlots";
import { SlotsDescription } from "../../components/Calendar/SlotsDescription";

export const Calendar = () => {

  return (
    <>
      <Days />
      <div className="flex flex-row items-start z-0">
        <div className="flex flex-row overflow-auto no-scrollbar w-full max-h-[calc(100vh-16rem)] z-0">
          <Time />
          <Timeslots />
        </div>
        <SlotsDescription />
      </div>
    </>
  );
};
