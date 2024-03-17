import { createSlice } from "@reduxjs/toolkit";
import { decodeToken } from "react-jwt";

const initialUserState = {
  id: 0,
  username: "",
  createAt: "",
  updateAt: "",
  roleIds: "",
  authorities: [],
  fullName: "",
  image: "",
  email: "",
  phone: "",
  address: "",
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUserStore: (state, action) => {
      const d = decodeToken(action.payload.token);
      localStorage.setItem("token", action.payload.token);
      return d?.userDetails || state;
    },
    logout: () => {
      console.log(12);
      localStorage.removeItem("token");
      return initialUserState;
    },
  },
});

export const { setUserStore, logout } = userSlice.actions;

export default userSlice.reducer;
