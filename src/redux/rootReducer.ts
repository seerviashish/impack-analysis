import { combineReducers } from "@reduxjs/toolkit";
import errorReducer from "../pages/ErrorPage/slice";
import homeReducer from "../pages/HomePage/slice";

const rootReducer = combineReducers({
  errorPage: errorReducer,
  homePage: homeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
