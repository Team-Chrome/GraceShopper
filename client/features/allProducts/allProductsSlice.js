import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk("/api/products", async () => {
  try {
    const response = await axios.get("/api/products");
    return response.data;
  } catch (err) {
    console.log("fetchAllProducts Axios Error:err.message");
  }
});

export const allProductsSlice = createSlice({
  name: "allProducts",
  initialState: {
    items: [],
    searchKey: "",
  },
  reducers: {
    setSearchKey(state, action) {
      console.log("action.payload....................", action.payload);
      state.searchKey = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const { setSearchKey } = allProductsSlice.actions;

export default allProductsSlice.reducer;
