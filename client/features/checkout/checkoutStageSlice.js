import { createSlice } from "@reduxjs/toolkit";

export const checkoutStageSlice = createSlice({
  name: "checkout",
  initialState: "1",
  reducers: {
    setStage: (state, action) => action.payload,
  },
});

export const { setStage } = checkoutStageSlice.actions;

export const selectCheckoutStage = (state) => state.checkoutStage;

export default checkoutStageSlice.reducer;
