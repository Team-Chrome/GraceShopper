import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchShippingAddress = createAsyncThunk(
  "fetchShipping",
  async ({ userId }) => {
    const { data } = await axios.get(`/api/shippingaddress`, { userId });
    return data;
  }
);

export const createShippingAddress = createAsyncThunk(
  "createShippingAddress",
  async ({ firstName, lastName, address, city, state, zip, phone, userId }) => {
    const { data } = await axios.post(`/api/shippingaddress`, {
      firstName,
      lastName,
      address,
      city,
      state,
      zip,
      phone,
      userId,
    });
    return data;
  }
);

export const shippingSlice = createSlice({
  name: "shipping",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchShippingAddress.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(createShippingAddress.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const selectShippingAddress = (state) => state.shipping;

export default shippingSlice.reducer;
