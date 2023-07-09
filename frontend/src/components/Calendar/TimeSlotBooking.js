import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { updateStatuses } from "../../store/slices/StatusSlice";
import {
  openWindow,
  setDateTime,
} from "../../store/slices/ModalSlice";

export const TimeSlotBooking = (props) => {
  const colors = {
    No_slot: "bg-slot_no",
    Free: "bg-slot_free",
    Busy: "bg-booked_normal",
  };

  const [status, setStatus] = useState(colors[props.status[0]]);

  useEffect(() => {
    // console.log("props.status", props.status)
    setStatus(colors[props.status[0]]);
  }, [props.status])


  const dispatch = useDispatch();

  const updateStatus = () => {
    const role = JSON.parse(localStorage.getItem("role"));
    console.log(role)
    if (role === "visitor" && status === colors["Free"]) {
      dispatch(
        setDateTime({ date: props.timeslot[0], time: props.timeslot[1] })
      );
      dispatch(openWindow());
      setStatus(colors["Busy"]);
    } else if (role === "owner" && status === colors["No_slot"]) {
      setStatus(colors["Free"]);
      dispatch(
        updateStatuses({
          date: props.timeslot[0],
          status: "free_slots",
          time: props.timeslot[1],
          role: role,
        })
      );
    }
  };

  return (
    <div className="group p-1 border-header_border border-2 relative">
      <div
        onClick={() => {
          updateStatus();
        }}
        className={`pb-20 hover:bg-no_slot_hover hover:cursor-pointer rounded-md  ${status}`}
      ></div>
      {props.status[0] === "Busy" && JSON.parse(localStorage.getItem("role")) === "owner" ? (
        <div
          className="flex flex-col justify-center items-center  absolute top-0 right-0 group-hover:visible invisible w-full h-full bg-white border-booked_clicked border-2 py-4 px-5 z-20
      rounded-tl-lg rounded-tr-lg rounded-br-lg text-booked_clicked"
        >
          <p className="z-30">{props.status[1]}</p>
          <p className="z-30">{props.status[2]}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
