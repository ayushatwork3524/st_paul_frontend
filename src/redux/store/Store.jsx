import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./LoadingSlice";
import popupReducer from "./popupSlice";

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    popup: popupReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
