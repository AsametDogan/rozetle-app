import { createSlice } from "@reduxjs/toolkit";
export const page = createSlice({
  name: "page",
  initialState: { current: "badges" },

  reducers: {
    setPage: (state, action) => {
      state.current = action.payload;
    },
  },
});

export const { setPage } = page.actions;
export default page.reducer;
