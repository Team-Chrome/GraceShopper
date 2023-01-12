import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk("/api/products", async ()=>{
    try {
        const response = await axios.get("/api/products")       
        return response.data
    }
    catch (err) {
        console.log("fetchAllProducts Axios Error:err.message")
    }
})

export const allProductsSlice = createSlice({
    name: "allProducts",
    initialState: {
        items: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.fulfilled, (state,action)=>{
            state.items = action.payload
        })        
    }
})

export default allProductsSlice.reducer
