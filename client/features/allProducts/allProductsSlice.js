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

// export const addSingleProductAsync = createAsyncThunk(
//   "addSingleProduct",
//   async ({ name, roaster, origin, description, price, quantity, imageUrl }) => {
//     try {
//       const { data } = await axios.post("/api/products/addProduct", {
//         name,
//         roaster,
//         origin,
//         description,
//         price,
//         quantity,
//         imageUrl,
//       });
//       console.log(
//         "data from component",
//         name,
//         roaster,
//         origin,
//         description,
//         price,
//         quantity,
//         imageUrl
//       );

//       return data;
//     } catch (error) {
//       console.log("there was a problem with creating addSingleProductAsync");
//     }
//   }
// );

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
    // builder.addCase(addSingleProductAsync.fulfilled, (state, { payload }) => {
    //   console.log("addSingleProductAsync addpayload................", payload);
    //   return payload;
    // });
  },
});

export const { setSearchKey } = allProductsSlice.actions;

export default allProductsSlice.reducer;
