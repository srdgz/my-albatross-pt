import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL_CURRENCIES;

if (!API_URL) {
  throw new Error("API URL is not defined");
}

export const fetchCurrencies = createAsyncThunk(
  "currencies/fetch",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

export const fetchCurrencyDetail = createAsyncThunk(
  "currencies/fetchDetail",
  async (currencyCode: string) => {
    const response = await axios.get(`${API_URL}/${currencyCode}`);
    return response.data;
  }
);

interface CurrencyState {
  list: Array<{
    code: string;
    currentRate: number;
    differenceBetweenYesterdayRate: number;
  }>;
  detail: {
    code: string;
    currentRate: number;
    differenceBetweenYesterdayRate: number;
    history: Array<{
      date: string;
      rate: number;
    }>;
  } | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  detailStatus: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: CurrencyState = {
  list: [],
  detail: null,
  status: "idle",
  detailStatus: "idle",
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
    builder
      .addCase(fetchCurrencyDetail.pending, (state) => {
        state.detailStatus = "loading";
      })
      .addCase(fetchCurrencyDetail.fulfilled, (state, action) => {
        state.detail = action.payload;
        state.detailStatus = "succeeded";
      })
      .addCase(fetchCurrencyDetail.rejected, (state) => {
        state.detailStatus = "failed";
      });
  },
});

export default currencySlice.reducer;
