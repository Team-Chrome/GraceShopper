import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBillingAddress = createAsyncThunk(
  "fetchBilling",
  async (userId) => {
    const { data } = await axios.get(`/api/billingaddress/${userId}`);
    return data;
  }
);

export const createBillingAddress = createAsyncThunk(
  "createBillingAddress",
  async ({ userId, firstName, lastName, address, city, zip, email, phone }) => {
    const { data } = await axios.post(`/api/billingaddress`, {
      firstName,
      lastName,
      address,
      city,
      zip,
      email,
      phone,
      userId,
    });
    return data;
  }
);

export const billingSlice = createSlice({
  name: "billing",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBillingAddress.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(createBillingAddress.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const selectBillingAddress = (state) => {
  return state.billing;
};

export default billingSlice.reducer;
