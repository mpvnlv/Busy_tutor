import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { closeWindow } from "../../store/slices/ModalSlice";
import { updateStatuses } from "../../store/slices/StatusSlice";
import axios from "axios";
import { link } from "../Calendar/Constants";

export const Modal = () => {
  const time = useSelector((state) => state.modalReducer.time);
  const date = useSelector((state) => state.modalReducer.date);
  const tutor = useSelector((state) => state.modalReducer.tutor);
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log("clicked");
    dispatch(closeWindow());
    dispatch(
      updateStatuses({
        date: date,
        status: "busy_slots",
        time: time,
        role: "visitor",
        name: JSON.parse(localStorage.getItem("fullname")),
        phone: JSON.parse(localStorage.getItem("phone")),
      })
    );

    const reversedDate = date.slice().reverse();
    reversedDate[1] = Number(reversedDate[1] + 1).toString()
        .padStart(2, "0")

    const data = {
      type: "createEvent",
      mail: JSON.parse(localStorage.getItem("mail")),
      password: JSON.parse(localStorage.getItem("password")),
      secondMail: JSON.parse(localStorage.getItem("ownerMail")),
      nameOfEvent: "Meeting orginized by 'Busy Tutor'",
      description: `Here is some description`,
      start: `${reversedDate
        .map((element) => {
          return element.toString().padStart(2, "0");
        })
        .join("-")}T${time}:00:00+03:00`,
      end: `${reversedDate
        .map((element) => {
          return element.toString().padStart(2, "0");
        })
        .join("-")}T${(Number(time) + 1)
        .toString()
        .padStart(2, "0")}:00:00+03:00`,
    };
    console.log(data);
    axios.post(link, data).then((res) => {
      console.log(res);
    });
  };

  return (
    <div
      className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 bg-white w-1/4 h-2/5
    rounded-lg border-booked_clicked border-2 flex flex-col justify-around items-center px-10"
    >
      <h1 className="text-booked_clicked text-2xl text-center whitespace-pre-line mt-5">
        PLEASE CHECK THE BOOKING AND CONFIRM IT
      </h1>
      <div className="grid grid-cols-2 w-1/2 self-start">
        <div className="mb-4 text-booked_clicked">TUTOR:</div>
        <div className="">{tutor}</div>
        <div className="mb-4 text-booked_clicked">DATE:</div>
        <div className="">{date.join("/")}</div>
        <div className="mb-4 text-booked_clicked">TIME:</div>
        <div className="">{time + ":00"}</div>
      </div>
      <button
        onClick={() => {
          handleClick();
        }}
        className="w-full border border-booked_clicked text-booked_clicked py-2 mb-5"
      >
        CONFIRM
      </button>
    </div>
  );
};
