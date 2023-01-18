import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import store from "../../app/store";
function apiHeader() {
  const { auth } = store.getState();
  const config = {
    headers: {
      userid: auth.me.id ?? "-1",
    },
  };
  return config;
}

export const fetchCart = createAsyncThunk("fetchCart", async (id) => {
  const { data } = await axios.get(`/api/cart/${id}`, apiHeader());
  return data;
});

export const addItem = createAsyncThunk(
  "addItem",
  async ({ productId, quantity, price, userId }) => {
    console.log(
      "addItem ::::: productId, quantity, price, userId >>>>>",
      productId,
      quantity,
      price,
      userId
    );
    const { data } = await axios.post(
      `/api/cart/${userId}`,
      {
        productId,
        quantity,
        price,
      },
      apiHeader()
    );
    return data;
  }
);

export const updateItem = createAsyncThunk(
  "updateItem",
  async ({ cartId, productId, quantity }) => {
    console.log(
      "updateItem ::::: productId, quantity, cartId >>>>>",
      productId,
      quantity,
      cartId
    );
    const { data } = await axios.put(
      "/api/cart",
      {
        cartId,
        productId,
        quantity,
      },
      apiHeader()
    );
    return data;
  }
);

export const updateCartStatus = createAsyncThunk(
  "updateCartStatus",
  async ({ cartId, status }) => {
    console.log(status);
    console.log(cartId);
    const { data } = await axios.put(
      `/api/cart/${cartId}/status`,
      {
        status,
      },
      apiHeader()
    );
    return data;
  }
);

export const removeItem = createAsyncThunk("removeItem", async (cartItem) => {
  const { data } = await axios.delete(
    `/api/cart/${cartItem.cartId}/${cartItem.productId}`,
    apiHeader()
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
      if (!cart) {
        state.items = [];
        state.id = null;
        state.status = "";
        state.total = null;
      } else {
        state.items = cart.cartItems;
        state.id = cart.id;
        state.status = cart.status;
        state.total = 0;
        cart.cartItems.forEach((item) => {
          state.total += item.price * item.quantity;
        });
      }
    });
    builder.addCase(addItem.fulfilled, (state, action) => {
      if (!state.id) {
        state.id = action.payload.cartId;
      }
      state.items.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    });
    builder.addCase(removeItem.fulfilled, (state, action) => {
      state.items = state.items.filter((item) => {
        return item.productId !== action.payload[0].productId;
      });
      state.total -= action.payload[0].price * action.payload[0].quantity;
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
