import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCart = createAsyncThunk('fetchCart', async () => {
  const { data } = await axios.get('http://localhost8080/api/cart/id');
  return data;
});

export const addItem = createAsyncThunk('addItem', async () => {
  const { data } = await axios.post('http://localhost8080/api/cartitem/id');
  return data;
});

export const removeItem = createAsyncThunk('removeItem', async () => {
  const { data } = await axios.delete('http://localhost8080/api/cartitem/id');
  return data;
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    id: null,
    items: [],
    total: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //assumes db query is returning an array items in cart
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.items = action.payload;
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

export default cartSlice.reducer;
