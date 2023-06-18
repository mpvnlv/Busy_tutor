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
  return [day, month, year];
};

export const getCurrentSunday = (day, month, year) => {
  const date = new Date(year, month, day);
  const currentDayOfWeek = date.getDay();
  if (currentDayOfWeek === 0) {
    return [day, month, year];
  }
  if (date - currentDayOfWeek > 0) {
    return [date - currentDayOfWeek, month, year];
  } else {
    if (month === 0) {
      return [
        getDaysInMonth(11, year - 1) - currentDayOfWeek + 1,
        11,
        year - 1,
      ];
    }

    return [
      getDaysInMonth(month - 1, year) - currentDayOfWeek + 1,
      month - 1,
      year,
    ];
  }
};

export const getNextSunday = (date) => {
  const [day, month, year] = date;
  if (day + 7 <= getDaysInMonth(month, year)) {
    return [day + 7, month, year];
  } else {
    if (month === 11) {
      return [day + 7 - getDaysInMonth(month, year), 0, year + 1];
    } else {
      return [day + 7 - getDaysInMonth(month, year), month + 1, year];
    }
  }
};

export const getPrevSunday = (date) => {
  const [day, month, year] = date;
  if (day - 7 > 0) {
    return [day - 7, month, year];
  } else {
    if (month === 0) {
      return [getDaysInMonth(11, year - 1) - (7 - day), 11, year - 1];
    } else {
      return [getDaysInMonth(month - 1, year) - (7 - day), month - 1, year];
    }
  }
};

export const getDaysInWeek = (curSunday, curMonth, curYear) => {
  const daysInWeek = [];
  for (let i = 0; i < 7; i++) {
    if (curSunday + i <= getDaysInMonth(curMonth, curYear)) {
      daysInWeek.push([curSunday + i, curMonth, curYear]);
    } else {
      if (curMonth === 11) {
        daysInWeek.push([
          curSunday + i - getDaysInMonth(curMonth, curYear),
          1,
          curYear + 1,
        ]);
      } else {
        daysInWeek.push([
          curSunday + i - getDaysInMonth(curMonth, curYear),
          curMonth + 1,
          curYear,
        ]);
      }
    }
  }

  return daysInWeek;
};
