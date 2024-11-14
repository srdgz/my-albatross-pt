import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { initialState } from "../types/types";

const API_URL = process.env.EXPO_PUBLIC_API_URL_CURRENCIES;

if (!API_URL) {
  throw new Error("API URL is not defined");
}

export const fetchCurrencies = createAsyncThunk(
  "currencies/fetch",
  async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching currencies:", error.message);
      throw new Error(
        error.response?.data?.message || "Failed to fetch currencies"
      );
    }
  }
);

export const fetchCurrencyDetail = createAsyncThunk(
  "currencies/fetchDetail",
  async (currencyCode: string) => {
    try {
      const response = await axios.get(`${API_URL}/${currencyCode}`);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching currency detail:", error.message);
      throw new Error(
        error.response?.data?.message || "Failed to fetch currency detail"
      );
    }
  }
);

const currencySlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchCurrencies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch currencies";
      });
    builder
      .addCase(fetchCurrencyDetail.pending, (state) => {
        state.detailStatus = "loading";
        state.error = null;
      })
      .addCase(fetchCurrencyDetail.fulfilled, (state, action) => {
        state.detail = action.payload;
        state.detailStatus = "succeeded";
        state.error = null;
      })
      .addCase(fetchCurrencyDetail.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.error = action.error.message || "Failed to fetch currency detail";
      });
  },
});

export default currencySlice.reducer;
