import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
};
const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    userSignIn: (state) => {
      state.isAuth = true;
    },
  },
});

export const { userSignIn } = authSlice.actions;

export default authSlice.reducer;
