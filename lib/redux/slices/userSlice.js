import { createSlice } from "@reduxjs/toolkit";


export const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      //state.themeMode = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
