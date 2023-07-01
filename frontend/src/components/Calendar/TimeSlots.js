import { useSelector } from "react-redux";
import { TimeSlotBooking } from "./TimeSlotBooking";
import { useEffect, useState } from "react";
import { generateSlots } from "./JsonGenerator";
import { useDispatch } from "react-redux";
import { setStatuses } from "../../store/slices/StatusSlice";
import axios from "axios";
import { link } from "../../components/Calendar/Constants";

export const Timeslots = () => {
  const daysOfWeek = useSelector((state) => state.dateReducer.daysOfWeek);

  const dispatch = useDispatch();

  const statuses = useSelector((state) => state.statusReducer.statuses);

  const timeslots = new Array(24 * 7).fill(null).map((item, index) => {
    const dayIndex = index % 7;
    const hour = Math.floor(index / 7);
    const date = daysOfWeek[dayIndex];
    const formattedHour = `${hour.toString().padStart(2, "0")}`;
    return [date, formattedHour];
  });

    useEffect(() => {
       const data = {
         type: "setTime",
         mail: JSON.parse(localStorage.getItem("mail")),
         password: JSON.parse(localStorage.getItem("password")),
         freeSlots:  JSON.stringify(statuses["free_slots"]),
         busySlots:  JSON.stringify(statuses["busy_slots"]),
       };
       axios
         .post(link, data)
         .then((response) => console.log(response.data))
         .catch((error) => {
           console.log(error);
         });
       console.log(data);
    }, [statuses]);


  const checkStatus = (timeslot) => {
    const [date, hour] = timeslot;
    var [day, month, year] = date;
    month += 1;
    // console.log(statuses);
    // console.log(date, hour);

    if (statuses?.["busy_slots"]?.[year]?.[month]?.[day]?.includes(hour)) {
      // console.log(`${date}, ${hour}: Busy`);
      return "Busy";
    } else if (
      statuses?.["free_slots"]?.[year]?.[month]?.[day]?.includes(hour)
    ) {
      // console.log(`${date}, ${hour}: Free`);
      return "Free";
    } else {
      // console.log(`${date}, ${hour}: No slot`);
      return "No_slot";
    }
  };

  return (
    <div className="grid grid-cols-7 grid-rows-auto w-full ml-6 mt-4 rounded-sm border-header_border">
      {/* {console.log(timeslots)} */}
      {timeslots.map((timeslot) => (
        <TimeSlotBooking timeslot={timeslot} status={checkStatus(timeslot)} />
      ))}
    </div>
  );
};
