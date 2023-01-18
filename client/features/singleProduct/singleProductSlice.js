import {
  createSlice,
  createAsyncThunk,
  createNextState,
} from "@reduxjs/toolkit";
import axios from "axios";

export const addSingleProductAsync = createAsyncThunk(
  "addSingleProduct",
  async ({ name, roaster, origin, description, price, quantity, imageUrl }) => {
    try {
      const { data } = await axios.post("/api/products/addProduct", {
        name,
        roaster,
        origin,
        description,
        price,
        quantity,
        imageUrl,
      });

      console.log(
        "data from component",
        name,
        roaster,
        origin,
        description,
        price,
        quantity,
        imageUrl
      );

      return data;
    } catch (error) {
      console.log("there was a problem with creating addSingleProductAsync");
    }
  }
);

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

export const deleteSingleProductAsync = createAsyncThunk(
  "deleteSingleProduct",
  async (id) => {
    try {
      const { data } = await axios.delete(`/api/products/${id}`);
      return data;
    } catch (error) {
      console.log("something went wrong with deleteSingleProductAsync route");
    }
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
