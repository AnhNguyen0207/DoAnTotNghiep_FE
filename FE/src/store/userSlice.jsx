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
      localStorage.setItem("account_id", action.payload.accountId);
      return d?.userDetails || state;
    },
    logout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("account_id");
      return initialUserState;
    },
  },
});

export const { setUserStore, logout } = userSlice.actions;

export default userSlice.reducer;
