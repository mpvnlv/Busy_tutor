import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateStatuses } from "../../store/slices/StatusSlice";
import { link } from "../../components/Calendar/Constants";
import {
  openWindow,
  setDateTime,
  setTutor,
} from "../../store/slices/ModalSlice";

export const TimeSlotBooking = (props) => {
  const colors = {
    No_slot: "bg-slot_no",
    Free: "bg-slot_free",
    Busy: "bg-booked_normal",
  };

  const [status, setStatus] = useState(colors[props.status]);

  useEffect(() => {
    // console.log("props.status", props.status)
    setStatus(colors[props.status]);
  }, [colors, props.status])


  const dispatch = useDispatch();
  const statuses = useSelector((state) => state.statusReducer.statuses);
  const isOpen = useSelector((state) => state.modalReducer.isOpen);

  const updateStatus = () => {
    const role = JSON.parse(localStorage.getItem("role"));
    if (role === "visitor") {
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
      {/* {count === 2 ? (
        <div
          className="flex flex-col justify-center items-center  absolute -top-14 -right-28 group-hover:visible invisible  bg-white border-booked_clicked border-2 py-4 px-10 z-20
      rounded-tl-lg rounded-tr-lg rounded-br-lg text-booked_clicked"
        >
          <p className="z-30">{fullname}</p>
          <p className="z-30">тут мне с сервера пришлют номер телефона</p>
        </div>
      ) : (
        <></>
      )} */}
    </div>
  );
};
