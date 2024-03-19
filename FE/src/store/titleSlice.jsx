import { createSlice } from "@reduxjs/toolkit";

const initialTitle = "";
export const titleSilce = createSlice({
  name: "title",
  initialState: initialTitle,
  reducers: {
    setTitle: (state, action) => {
      return action?.payload?.title || initialTitle;
    },
  },
});

export const { setTitle } = titleSilce.actions;

export default titleSilce.reducer;
