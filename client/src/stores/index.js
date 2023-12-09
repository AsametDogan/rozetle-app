import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./Page.js";
import userReducer from "./User.js";

export default configureStore({
  reducer: {
    page: pageReducer,
    user: userReducer,
  },
});
