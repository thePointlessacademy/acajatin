import { createSlice } from "@reduxjs/toolkit";
import STATUSES from "./STATUSES";

const authSlice = createSlice({
  name: "auth",
  initialState: { data: [], isLoggedin: false, status: STATUSES.IDLE },
  reducers: {
    login(state, action) {
      state.data = action.payload;
      state.isLoggedin = true;
    },
    logout(state) {
      console.log("logout called");
      state.data = [];
      state.isLoggedin = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
