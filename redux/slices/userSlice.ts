import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  username: "",
  email: "",
  uid: "",
};

const modalSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInUser: (state, action) => {
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
    },
    signOutUser: (state) => {
      state.name = "";
      state.username = "";
      state.email = "";
      state.uid = "";
    },
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.uid = action.payload.uid;
    },
  },
});

export const { signInUser, signOutUser, setUser } = modalSlice.actions;

export default modalSlice.reducer;
