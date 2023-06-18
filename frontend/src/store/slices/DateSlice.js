import { createSlice } from "@reduxjs/toolkit";
import { getCurrentSunday } from "../../components/Calendar/Constants";
import { getDaysInWeek } from "../../components/Calendar/Constants";
import { getCurrentDate } from "../../components/Calendar/Constants";
import { getNextSunday } from "../../components/Calendar/Constants";
import { getPrevSunday } from "../../components/Calendar/Constants";

const initialState = {
  curSunday: getCurrentSunday(...getCurrentDate()),
  daysOfWeek: getDaysInWeek(...getCurrentDate()),
};

const dateSlice = createSlice({
  name: "dateSlice",
  initialState,
  reducers: {
    nextWeek: (state, action) => {
      state.curSunday = getNextSunday(state.curSunday);
      state.daysOfWeek = getDaysInWeek(...state.curSunday);
    },
    prevWeek: (state, action) => {
      state.curSunday = getPrevSunday(state.curSunday);
      state.daysOfWeek = getDaysInWeek(...state.curSunday);
    },
  },
});

export const { nextWeek, prevWeek } = dateSlice.actions;

export default dateSlice.reducer;
