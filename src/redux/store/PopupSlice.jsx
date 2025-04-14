import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    isOpen: false,
    title: "",
    message: "",
    confirmText: "Confirm",
    cancelText: "Cancel",
    functionKey: null, // Store function key instead of function itself
    functionParams: [], // Store function parameters
  },
  reducers: {
    openPopup: (state, action) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.confirmText = action.payload.confirmText;
      state.cancelText = action.payload.cancelText;
      state.functionKey = action.payload.functionKey;
      state.functionParams = action.payload.functionParams || [];
    },
    closePopup: (state) => {
      state.isOpen = false;
      state.functionKey = null;
      state.functionParams = [];
    },
  },
});

export const { openPopup, closePopup } = popupSlice.actions;
export default popupSlice.reducer;
