import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://myalbatross-technical-proof-api.pages.dev/currencies";

export const fetchCurrencies = createAsyncThunk(
  "currencies/fetch",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

interface CurrencyState {
  list: Array<{
    code: string;
    currentRate: number;
    differenceBetweenYesterdayRate: number;
  }>;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: CurrencyState = {
  list: [],
  status: "idle",
};

const currencySlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchCurrencies.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default currencySlice.reducer;
