import { useDispatch, useSelector } from "react-redux";
import { TimeSlotBooking } from "./TimeSlotBooking";
import { useEffect } from "react";
import axios from "axios";
import { link } from "../../components/Calendar/Constants";
import { setTutor } from "../../store/slices/ModalSlice";
import { setStatuses } from "../../store/slices/StatusSlice";

export const Timeslots = () => {
  const daysOfWeek = useSelector((state) => state.dateReducer.daysOfWeek);

  const statuses = useSelector((state) => state.statusReducer.statuses);

  const timeslots = new Array(24 * 7).fill(null).map((_, index) => {
    const dayIndex = index % 7;
    const hour = Math.floor(index / 7);
    const date = daysOfWeek[dayIndex];
    const formattedHour = `${hour.toString().padStart(2, "0")}`;
    return [date, formattedHour];
  });
  

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("statuses", statuses);

    if (
      Object.keys(statuses.free_slots).length === 0 &&
      Object.keys(statuses.busy_slots).length === 0
    ) {
      return;
    }

    const data = {
      type: "setTime",
      mail: JSON.parse(localStorage.getItem("mail")),
      password: JSON.parse(localStorage.getItem("password")),
      freeSlots: JSON.stringify(
        statuses.free_slots !== undefined ? statuses.free_slots : {}
      ),
      busySlots: JSON.stringify(
        statuses.busy_slots !== undefined ? statuses.busy_slots : {}
      ),
    };

    axios
      .post(link, data)
      .then((response) => console.log(response.data))
      .catch((error) => {
        console.log(error);
      });

    console.log(data);
  }, [statuses]);

  const getInfo = async () => {
    const data = {};
    data.type = "getInfo";
    data.mail = JSON.parse(localStorage.getItem("ownerMail"));
    console.log(data);
    axios
      .post(link, data)
      .then((response) => {
        console.log(response.data);
        dispatch(setTutor(response.data.fullname));
      })
      .catch((reason) => {
        if (reason.response) {
          if (reason.response.status === 406) {
            // alert("This user is alredy exist. Please log in")
          } else if (reason.response.status === 405) {
          }
          console.log(reason.response.status);
        } else if (reason.request) {
          console.log(reason.response.status);
        }
      });
  };

  const getStatuses = async () => {
    const data = {};
    data.type = "getTime";
    if (JSON.parse(localStorage.getItem("role")) === "owner")
      data.ownerMail = JSON.parse(localStorage.getItem("mail"));
    else data.ownerMail = JSON.parse(localStorage.getItem("ownerMail"));
    console.log(data);
    axios
      .post(link, data)
      .then((response) => {
        console.log(response.data);
        dispatch(
          setStatuses({
            free_slots: JSON.parse(response.data.freeSlots),
            busy_slots: JSON.parse(response.data.busySlots),
          })
        );
      })
      .catch((reason) => {
        if (reason.response) {
          if (reason.response.status === 406) {
            // alert("This user is alredy exist. Please log in")
          } else if (reason.response.status === 405) {
          }
          console.log(reason.response.status);
        } else if (reason.request) {
          console.log(reason.response.status);
        }
      });
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("role") === "owner")) getInfo();
    getStatuses();
  }, []);

  const checkStatus = (timeslot) => {
    const [date, hour] = timeslot;
    var [day, month, year] = date;
    
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
