import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: "visitor"
};

const roleSlice = createSlice({
  name: "roleSlice",
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setRole } = roleSlice.actions;

export default roleSlice.reducer;
