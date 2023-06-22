import { useEffect, useState } from "react";
import axios from "axios";

export const TimeSlotBooking = () => {
  const slots = ["NO SLOT", "FREE", "BOOKED"];
  const colors = ["bg-slot_no", "bg-slot_free", "bg-booked_normal"];

  var [count, setCount] = useState(0)

  var fullname = "";

  const get_info = () => {

    const data_student = {
      "type": "log",
      "mail": "vikal",
      "password": "123"
      // "type":"reg",
      // "mail":"vika",
      // "password":"123",
      // "role":"owner",
      // "fullname":"Kruk Viktoria",
      // "ownerMail": "",
      // "phone":"8906675883"
    }
    axios.post('https://testing.egorleb.repl.co', data_student)
    .then(response => (
      console.log(response.data),
      fullname = response.data.fullname))
      .catch((error)=>{console.log(error)});

  }
  const sendFreeTime = () => {
    const data = {
      "type": "log",
      "mail": "vikal",
      "password": "123"
      // "type": "setTime",
      // "mail": "vikal",//видимо будем хранить в локалке данные 
      // "password": "123",
      // "freeSlots": "[[datetime, datetime], [datetime, datetime], ..., [datetime, datetime]]",
      // "busySlots": "[[datetime, datetime], [datetime, datetime], ..., [datetime, datetime]]"
    }
    // const article = { title: 'React POST Request Example' };
    axios.post('https://testing.egorleb.repl.co', data)
        .then(response => (console.log(response.data))).catch((error)=>{console.log(error)});

   

  }

  useEffect(() => {
    if (count > 1) {
      setCount(0);
    }
    if (count === 1) {
      sendFreeTime();
    }
    if (count === 2) {
      get_info();
    }
  }, [count]);

  return (
    <div className="group p-1 border-header_border border-2 relative">
      <div
        onClick={() => {
          setCount(count + 1);
        }}
        className={`pb-20 hover:bg-no_slot_hover hover:cursor-pointer rounded-md  ${colors[count]}`}
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
