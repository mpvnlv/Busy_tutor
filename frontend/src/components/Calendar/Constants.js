export const days_name = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
export const months_name = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const link = "https://egor28476.pythonanywhere.com/"
export const getDaysInMonth = (month, year) => {
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  const daysInMonth = [
    31,
    isLeapYear ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  return daysInMonth[month];
};

export const getCurrentDate = () => {
  const day = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  console.log("Current time", day, month, year);
  return [day, month, year];
};

export const getCurrentMonday = (day, month, year) => {
  const date = new Date(year, month, day);
  console.log("Received - current day", day, month, year);
  const currentDayOfWeek = date.getDay();
  if (currentDayOfWeek === 1) {
    console.log("Didn't exceed month", day, month, year);
    return [day, month, year];
  }
  if (day - currentDayOfWeek >= 1) {
    console.log("Didn't exceed month", day, month, year);
    return [day - currentDayOfWeek + 1, month, year];
  } else {
    if (month === 0) {
      console.log(
        "Exceeded year",
        day + getDaysInMonth(11, year - 1) - (6 - currentDayOfWeek),
        0,
        year - 1
      );
      return [
        getDaysInMonth(11, year - 1) - (6 - currentDayOfWeek),
        11,
        year - 1,
      ];
    } else {
      console.log(
        "Exceeded month",
        day + getDaysInMonth(month - 1, year) - (6 - currentDayOfWeek),
        month - 1,
        year
      );
      return [
        getDaysInMonth(month - 1, year) - (6 - currentDayOfWeek) + 1,
        month - 1,
        year,
      ];
    }
  }
};

export const getNextMonday = (date) => {
  const [day, month, year] = date;
  console.log(day, month, year);
  const daysInMonth = getDaysInMonth(month, year);
  if (day + 7 <= daysInMonth) {
    console.log("Didn't exceed month", day + 7, month, year);
    return [day + 7, month, year];
  } else {
    if (month === 11) {
      console.log("Exceeded year", day + 7 - daysInMonth, 0, year + 1);
      return [day + 7 - daysInMonth, 0, year + 1];
    } else {
      console.log("Exceeded month", day + 7 - daysInMonth, month + 1, year);
      return [day + 7 - daysInMonth, month + 1, year];
    }
  }
};

export const getPrevMonday = (date) => {
  const [day, month, year] = date;
  console.log(day, month, year);
  if (day - 7 >= 1) {
    console.log("Didn't exceed month", day - 7, month, year);
    return [day - 7, month, year];
  } else {
    if (month === 0) {
      console.log(
        "Exceeded year",
        getDaysInMonth(11, year - 1) - (7 - day),
        11,
        year - 1
      );
      return [getDaysInMonth(11, year - 1) - (7 - day), 11, year - 1];
    } else {
      console.log(
        "Exceeded month",
        getDaysInMonth(month - 1, year) - (7 - day),
        month - 1,
        year
      );
      return [getDaysInMonth(month - 1, year) - (7 - day), month - 1, year];
    }
  }
};

export const getDaysInWeek = (curMonday, curMonth, curYear) => {
  console.log("Start", curMonday, curMonth, curYear);
  const daysInWeek = [];
  for (let i = 0; i < 7; i++) {
    if (curMonday + i <= getDaysInMonth(curMonth, curYear)) {
      console.log("Not exceeded", curMonday + i, curMonth, curYear);
      daysInWeek.push([curMonday + i, curMonth, curYear]);
    } else {
      if (curMonth === 11) {
        console.log(
          "Exceeded curYear",
          curMonday + i - getDaysInMonth(curMonth, curYear),
          1,
          curYear + 1
        );
        daysInWeek.push([
          curMonday + i - getDaysInMonth(curMonth, curYear),
          1,
          curYear + 1,
        ]);
      } else {
        console.log(
          "Exceeded curMonth",
          curMonday + i - getDaysInMonth(curMonth, curYear),
          curMonth + 1,
          curYear
        );
        daysInWeek.push([
          curMonday + i - getDaysInMonth(curMonth, curYear),
          curMonth + 1,
          curYear,
        ]);
      }
    }
  }
  return daysInWeek;
};
