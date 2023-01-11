import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("fetchCart", async () => {
  const { data } = await axios.get("/api/cart/1");
  return data;
});

export const addItem = createAsyncThunk(
  "addItem",
  async ({ cartId, productId, quantity }) => {
    console.log("thunk", cartId, productId, quantity);
    const { data } = await axios.post("/api/cart", {
      cartId,
      productId,
      quantity,
    });
    return data;
  }
);

export const updateItem = createAsyncThunk(
  "updateItem",
  async ({ cartId, productId, quantity }) => {
    const { data } = await axios.put("/api/cart", {
      cartId,
      productId,
      quantity,
    });
    return data;
  }
);

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
    builder.addCase(removeItem.fulfilled, (state, action) => {
      return state.items.filter((item) => {
        return item.id !== action.payload.id;
      });
    });
    builder.addCase(updateItem.fulfilled, (state, action) => {
      const cart = action.payload;
      state.items = cart.cartItems;
      state.id = cart.id;
      state.status = cart.status;
    });
  },
});
export const selectCart = (state) => state.cart;
export default cartSlice.reducer;
