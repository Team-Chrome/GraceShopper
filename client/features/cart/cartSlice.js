import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("fetchCart", async (id) => {
  const { data } = await axios.get(`/api/cart/${id}`);
  return data;
});

export const addItem = createAsyncThunk(
  "addItem",
  async ({ productId, quantity, price, userId }) => {
    const { data } = await axios.post(`/api/cart/${userId}`, {
      productId,
      quantity,
      price,
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

export const updateCartStatus = createAsyncThunk(
  "updateCartStatus",
  async (cartId, status) => {
    const { data } = await axios.put(`/api/cart/${cartId}/status`, {
      status,
    });
    return data;
  }
);

export const removeItem = createAsyncThunk("removeItem", async (cartItem) => {
  const { data } = await axios.delete(
    `/api/cart/${cartItem.cartId}/${cartItem.productId}`
  );
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
  reducers: {
    clearCart: (state, action) => {
      state.id = null;
      state.items = [];
      state.status = "";
      state.total = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      const cart = action.payload[0];
      state.items = cart.cartItems;
      state.id = cart.id;
      state.status = cart.status;
      state.total = 0;
      cart.cartItems.forEach((item) => {
        state.total += item.price * item.quantity;
      });
    });
    builder.addCase(addItem.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    });
    builder.addCase(removeItem.fulfilled, (state, action) => {
      state.items = state.items.filter((item) => {
        return item.productId !== action.payload[0].productId;
      });
    });
    builder.addCase(updateItem.fulfilled, (state, action) => {
      const updatedItem = action.payload[0];
      state.items.forEach((item) => {
        if (item.productId === updatedItem.productId) {
          state.total -= item.price * item.quantity;
          item.quantity = updatedItem.quantity;
          state.total += item.price * item.quantity;
        }
      });
    });
    builder.addCase(updateCartStatus.fulfilled, (state, action) => {
      state.status = action.payload;
    });
  },
});
export const selectCart = (state) => state.cart;
export default cartSlice.reducer;
export const { clearCart } = cartSlice.actions;
