import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("fetchCart", async (id) => {
  const { data } = await axios.get(`/api/cart/${id}`);
  console.log(data);
  return data;
});

export const addItem = createAsyncThunk(
  "addItem",
  async ({ productId, quantity, userId }) => {
    console.log("thunk", cartId, productId, quantity);
    const { data } = await axios.post(`/api/cart/${userId}`, {
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

export const updateCartStatus = createAsyncThunk(
  "updateCartStatus",
  async (cartId, status) => {
    const { data } = await axios.put(`/api/cart/${cartId}/status`, {
      status,
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
      console.log(action.payload);
      const cart = action.payload[0];
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
      state.items.forEach((item) => {
        if (item.productId === action.payload.productId) {
          item.quantity = action.payload.quantity;
        }
      });
    });
  },
});
export const selectCart = (state) => state.cart;
export default cartSlice.reducer;
