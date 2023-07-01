import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateStatuses } from "../../store/slices/StatusSlice";
import { link } from "../../components/Calendar/Constants";

export const TimeSlotBooking = (props) => {
  const colors = {
    No_slot: "bg-slot_no",
    Free: "bg-slot_free",
    Busy: "bg-booked_normal",
  };

  const [status, setStatus] = useState(colors[props.status]);
  const role = useSelector((state) => state.roleReducer.role);
  const dispatch = useDispatch();
  const statuses = useSelector((state) => state.statusReducer.statuses);
  var [count, setCount] = useState(0);
  var fullname = "";

  const getInfo = () => {
    const data_student = {
      type: "log",
      mail: "vikal",
      password: "123",
      // "type":"reg",
      // "mail":"vika",
      // "password":"123",
      // "role":"owner",
      // "fullname":"Kruk Viktoria",
      // "ownerMail": "",
      // "phone":"8906675883"
    };
    axios
      .post(link, data_student)
      .then(
        (response) => (
          console.log(response.data), (fullname = response.data.fullname)
        )
      )
      .catch((error) => {
        console.log(error);
      });
  };


  const updateStatus = () => {
    if (role === "visitor" && status === colors["No_slot"]) {
      setStatus(colors["Busy"]);
      dispatch(
        updateStatuses({
          date: props.timeslot[0],
          status: "busy_slots",
          time: props.timeslot[1],
        })
      );
      
      
    } else if (role === "owner" && status === colors["No_slot"]) {
      setStatus(colors["Free"]);
      dispatch(
        updateStatuses({
          date: props.timeslot[0],
          status: "free_slots",
          time: props.timeslot[1],
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
      {count === 2 ? (
        <div
          className="flex flex-col justify-center items-center  absolute -top-14 -right-28 group-hover:visible invisible  bg-white border-booked_clicked border-2 py-4 px-10 z-20
      rounded-tl-lg rounded-tr-lg rounded-br-lg text-booked_clicked"
        >
          <p className="z-30">{fullname}</p>
          <p className="z-30">тут мне с сервера пришлют номер телефона</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
