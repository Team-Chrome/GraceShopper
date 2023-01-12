import { createSlice } from "@reduxjs/toolkit";

export const checkoutStageSlice = createSlice({
  name: "checkout",
  initialState: 1,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
  },
});

export const selectCheckoutStage = (state) => state.checkoutStage;
export default checkoutStageSlice.reducer;
