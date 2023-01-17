import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiHeader } from "/client/utils"

export const fetchSingleProductAsync = createAsyncThunk(
  "singleProduct",
  async (id) => {
    const { data } = await axios.get(`/api/products/${id}`,apiHeader());
    return data;
  }
);

export const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectSingleProduct = (state) => state.product;

export default singleProductSlice.reducer;
