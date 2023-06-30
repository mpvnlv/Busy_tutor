import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  statuses: {
    free_slots: {},
    busy_slots: {},
  },
};

const statusSlice = createSlice({
  name: "statusSlice",
  initialState,
  reducers: {
    setStatuses: (state, action) => {
      console.log("Setting statuses");
      state.statuses = action.payload;
    },
    updateStatuses: (state, action) => {
      console.log(action.payload);
      const [day, month, year] = action.payload.date;
      const status = action.payload.status;
      const slot = action.payload.time;
      delete state.statuses["busy_slots"]?.[year]?.[month]?.[day]?.[slot];
      delete state.statuses["free_slots"]?.[year]?.[month]?.[day]?.[slot];
      if (!state.statuses[status]) {
        state.statuses[status] = {};
      }
      if (!state.statuses[status][year]) {
        state.statuses[status][year] = {};
      }
      if (!state.statuses[status][year][month]) {
        state.statuses[status][year][month] = {};
      }
      if (!state.statuses[status][year][month][day]) {
        state.statuses[status][year][month][day] = [];
      }
      state.statuses[status][year][month][day].push(slot);
    }
  },
});

export const { setStatuses, updateStatuses } = statusSlice.actions;

export default statusSlice.reducer;
