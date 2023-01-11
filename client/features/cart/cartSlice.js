import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("fetchCart", async () => {
  const { data } = await axios.get("/api/cart/1");
  return data;
});

export const addItem = createAsyncThunk("addItem", async () => {
  const { data } = await axios.post("/api/cart/id/productId");
  return data;
});

export const removeItem = createAsyncThunk("removeItem", async () => {
  const { data } = await axios.delete("/api/cart/id/productId");
  return data;
});

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    id: null,
    items: [],
    status: "",
    total: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      const cart = action.payload;
      state.items = cart.cartItems;
      state.id = cart.id;
      state.status = cart.status;
    });
    builder.addCase(addItem.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
    //assumes each item in array is an object with properties
    builder.addCase(removeItem.fulfilled, (state, action) => {
      state.items.filter((item) => {
        return item.id !== action.payload.id;
      });
    });
  },
});
export const selectCart = (state) => state.cart;
export default cartSlice.reducer;
