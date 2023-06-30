import { getDaysInMonth } from "./Constants";

export const generateSlots = () => {
  const busy_slots = {};
  const free_slots = {};

  for (let year = 2023; year <= 2023; year++) {
    for (let month = 1; month <= 12; month++) {
      const daysInMonth = getDaysInMonth(month - 1, year);

      for (let day = 1; day <= daysInMonth; day++) {
        for (let hour = 0; hour <= 23; hour++) {
          const formattedHour = hour.toString().padStart(2, "0");
          const slot = formattedHour;
          const random = Math.random()
          if (random < 0.3) {
            if (!busy_slots[year]) {
              busy_slots[year] = {};
            }
            if (!busy_slots[year][month]) {
              busy_slots[year][month] = {};
            }
            if (!busy_slots[year][month][day]) {
              busy_slots[year][month][day] = [];
            }
            busy_slots[year][month][day].push(slot);
          } else if (0.3 <random && random < 0.5) {
            if (!free_slots[year]) {
              free_slots[year] = {};
            }
            if (!free_slots[year][month]) {
              free_slots[year][month] = {};
            }
            if (!free_slots[year][month][day]) {
              free_slots[year][month][day] = [];
            }
            free_slots[year][month][day].push(slot);
          }
        }
      }
    }
  }
  console.log("Completed generating slots");
  return { free_slots, busy_slots };
};
