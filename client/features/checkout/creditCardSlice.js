import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCreditCard = createAsyncThunk("fetchcredit", async (id) => {
  const { data } = await axios.get(`/api/creditcard/${id}`);
  return data;
});

export const createCreditCard = createAsyncThunk(
  "createCreditCard",
  async ({ userId, name, cardNumber, expiration, csv }) => {
    const { data } = await axios.post(`/api/creditcard/${userId}`, {
      name,
      cardNumber,
      expiration,
      csv,
      userId,
    });
    return data;
  }
);
export const creditSlice = createSlice({
  name: "credit",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCreditCard.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(createCreditCard.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const selectCreditCard = (state) => state.credit;
export default creditSlice.reducer;
