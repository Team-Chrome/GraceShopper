import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleUserAync = createAsyncThunk(
  "findSingleUser",
  async (email) => {
    const { data } = await axios.get(`/api/users/${email}`);
    return data;
  }
);

export const singleUserSlice = createSlice({
  name: "singleUser",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleUserAync.fulfilled, (state, { payload }) => {
      console.log("payload", payload);
      return payload;
    });
  },
});

export const selectSingleUser = (state) => state.singleUser;

export default singleUserSlice.reducer;
