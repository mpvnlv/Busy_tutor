import { createSlice } from "@reduxjs/toolkit";
import { getCurrentMonday } from "../../components/Calendar/Constants";
import { getDaysInWeek } from "../../components/Calendar/Constants";
import { getCurrentDate } from "../../components/Calendar/Constants";
import { getNextMonday } from "../../components/Calendar/Constants";
import { getPrevMonday } from "../../components/Calendar/Constants";

const initialState = {
  curSunday: getCurrentMonday(...getCurrentDate()),
  daysOfWeek: getDaysInWeek(...getCurrentDate()),
};

const dateSlice = createSlice({
  name: "dateSlice",
  initialState,
  reducers: {
    nextWeek: (state, action) => {
      state.curSunday = getNextMonday(state.curSunday);
      state.daysOfWeek = getDaysInWeek(...state.curSunday);
    },
    prevWeek: (state, action) => {
      state.curSunday = getPrevMonday(state.curSunday);
      state.daysOfWeek = getDaysInWeek(...state.curSunday);
    },
  },
});

export const { nextWeek, prevWeek } = dateSlice.actions;

export default dateSlice.reducer;
