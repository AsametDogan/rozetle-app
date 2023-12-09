import { createSlice } from "@reduxjs/toolkit";
export const user = createSlice({
  name: "user",
  initialState: {
    data: {
      profileImg: "",
    },
  },

  reducers: {
    setAuth: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setAuth } = user.actions;
export default user.reducer;
