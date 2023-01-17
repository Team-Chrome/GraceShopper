import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleProductAsync = createAsyncThunk(
  "singleProduct",
  async (id) => {
    const { data } = await axios.get(`/api/products/${id}`);
    return data;
  }
);

export const updateSingleProductAsync = createAsyncThunk(
  "editSingleProdcuct",
  async ({ id, name, roaster, origin, description, price, imageUrl }) => {
    console.log(
      "within singleProductAsync..........",
      id,
      name,
      roaster,
      origin,
      description,
      price,
      imageUrl
    );
    const { data } = await axios.put(`/api/products/${id}`, {
      id,
      name,
      roaster,
      origin,
      description,
      price,
      imageUrl,
    });
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
