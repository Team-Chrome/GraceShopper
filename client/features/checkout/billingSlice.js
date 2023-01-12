import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBillingAddress = createAsyncThunk(
  "fetchBilling",
  async (cardId) => {
    const { data } = await axios.get(`/api/billingaddress/${cardId}`);
    return data;
  }
);

export const createBillingAddress = createAsyncThunk(
  "createBillingAddress",
  async ({ cardId, firstName, lastName, address, city, zip, email, phone }) => {
    const { data } = await axios.post(`/api/billingaddress/${cardId}`, {
      firstName,
      lastName,
      address,
      city,
      zip,
      email,
      phone,
    });
    return data;
  }
);

export const billingSlice = createSlice({
  name: "billing",
  intitalState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBillingAddress.fulfilled, (state, action) => {
      return action.payload;
    }),
      builder.addCase(createBillingAddress.fulfilled, (state, action) => {
        state.push(action.payload);
      });
  },
});

export const selectBillingAddress = (state) => state.billing;

export default billingSlice.reducer;
