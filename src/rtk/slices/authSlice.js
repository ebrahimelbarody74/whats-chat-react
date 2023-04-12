import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const postData = createAsyncThunk("postData", async (data, thunkAPI) => {
  const response = await axios.post("api/auth/login", data);

  return response.data;
});

const initialState = {};

// Then, handle actions in your reducers:
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Do something while pending if you want.
    builder.addCase(postData.pending, (state, action) => {});
    // Do something when passes.
    builder.addCase(postData.fulfilled, (state, action) => {});
    // Do something if fails.
    builder.addCase(postData.rejected, (state, action) => {});
  },
});

export const {} = dataSlice.actions;
export default dataSlice.reducer;
