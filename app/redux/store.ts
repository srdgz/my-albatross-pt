import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./currencySlice";

export const store = configureStore({
  reducer: {
    currencies: currencyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
