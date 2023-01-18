import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiHeader } from "/client/utils";

export const fetchShippingAddress = createAsyncThunk(
  "fetchShippingAddress",
  async (id) => {
    console.log(id);
    const { data } = await axios.get(`/api/shippingaddress`, id, apiHeader());
    return data;
  }
);

export const createShippingAddress = createAsyncThunk(
  "createShippingAddress",
  async ({ firstName, lastName, address, city, state, zip, phone, userId }) => {
    const { data } = await axios.post(
      `/api/shippingaddress`,
      {
        firstName,
        lastName,
        address,
        city,
        state,
        zip,
        phone,
        userId,
      },
      apiHeader()
    );
    return data;
  }
);

export const shippingSlice = createSlice({
  name: "shipping",
  initialState: {},
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
