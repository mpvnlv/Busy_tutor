import { days_name } from "./Constants";
import { useState } from "react";

export const Days = () => {
  const [firstDate, setFirstDate] = useState(() => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const diff =
      currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
    return new Date(currentDate.setDate(diff)).getDate();
  });

  return (
    <div className="flex justify-between items-center pr-72 pl-48 pt-6 pb-4">
      {days_name.map((day, index) => {
        return (
          <div key={index} className="flex flex-col justify-between items-center">
            <p>{day}</p>
            <p className="pt-6">{firstDate + index}</p>
          </div>
        );
      })}
    </div>
  );
};
