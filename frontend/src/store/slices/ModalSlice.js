import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: "",
  time: "",
  tutor: "",
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    setDateTime: (state, action) => {
      state.date = action.payload.date;
      state.time = action.payload.time;
      },
      setTutor: (state, action) => {
          state.tutor = action.payload;
        },
    closeWindow: (state) => {
      state.isOpen = false;
    },
    openWindow: (state) => {
      state.isOpen = true;
    },
  },
});

export const { setDateTime, closeWindow, openWindow, setTutor } = modalSlice.actions;

export default modalSlice.reducer;
