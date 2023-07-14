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
      console.log(action.payload)
      state.statuses = action.payload;
    },
    updateStatuses: (state, action) => {
      console.log(action.payload);
      console.log(state)
      const [day, month, year] = action.payload.date;
      const set_status = action.payload.status;
      const slot = action.payload.time;
      const role = action.payload.role;
 
      if (role === "owner" && set_status === "free_slots") {
        if (!state.statuses[set_status]) {
          state.statuses[set_status] = {};
        }
        console.log(state.statuses[set_status])
        if (!state.statuses[set_status][year]) {
          state.statuses[set_status][year] = {};
        }
        if (!state.statuses[set_status][year][month]) {
          state.statuses[set_status][year][month] = {};
        }
        if (!state.statuses[set_status][year][month][day]) {
          state.statuses[set_status][year][month][day] = [];
        }
        state.statuses[set_status][year][month][day].push(slot);
      }


      if (role === "visitor" && set_status === "busy_slots") { 
        const name = action.payload.name;
        const phone = action.payload.phone;
        delete state.statuses["free_slots"]?.[year]?.[month]?.[day]?.[slot];
        if (!state.statuses[set_status]) {
          state.statuses[set_status] = {};
        }
        if (!state.statuses[set_status][year]) {
          state.statuses[set_status][year] = {};
        }
        if (!state.statuses[set_status][year][month]) {
          state.statuses[set_status][year][month] = {};
        }
        if (!state.statuses[set_status][year][month][day]) {
          state.statuses[set_status][year][month][day] = {};
        }
        if (!state.statuses[set_status][year][month][day][slot]) {
          state.statuses[set_status][year][month][day][slot] = {};
        }
        state.statuses[set_status][year][month][day][slot].name = name;
        state.statuses[set_status][year][month][day][slot].phone = phone;
        
      }
    //   delete state.statuses["busy_slots"]?.[year]?.[month]?.[day]?.[slot];
    //   delete state.statuses["free_slots"]?.[year]?.[month]?.[day]?.[slot];
    //   if (!state.statuses[status]) {
    //     state.statuses[status] = {};
    //   }
    //   if (!state.statuses[status][year]) {
    //     state.statuses[status][year] = {};
    //   }
    //   if (!state.statuses[status][year][month]) {
    //     state.statuses[status][year][month] = {};
    //   }
    //   if (!state.statuses[status][year][month][day]) {
    //     state.statuses[status][year][month][day] = [];
    //   }
    //   state.statuses[status][year][month][day].push(slot);
     
    },
  },
});

export const { setStatuses, updateStatuses } = statusSlice.actions;

export default statusSlice.reducer;
