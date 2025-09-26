import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    userName: null,
    email: null,
    token: null,
    driverId: null,
    phoneNumber: null,
  },
  reducers: {
    setUserCredential: (state, action) => {
      const { userName, email, token, driverId, phoneNumber } = action.payload;
      state.userName = userName;
      state.email = email;
      state.token = token;
      state.driverId = driverId;
      state.phoneNumber = phoneNumber;
    },
    updateUser: (state, action) => {
      const { userName, email, phoneNumber } = action.payload;
      if (userName !== undefined) state.userName = userName;
      if (email !== undefined) state.email = email;
      if (phoneNumber !== undefined) state.phoneNumber = phoneNumber;
    },
    logOutUser: (state) => {
      state.userName = null;
      state.email = null;
      state.token = null;
      state.driverId = null;
    },
  },
});

export const { setUserCredential, logOutUser, updateUser } = AuthSlice.actions;
export default AuthSlice.reducer;
