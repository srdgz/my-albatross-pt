import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
import { UserState } from "../types/types";

const API_URL = process.env.EXPO_PUBLIC_API_URL_USER;

if (!API_URL) {
  throw new Error("API URL is not defined");
}

export const fetchUser = createAsyncThunk("user/fetch", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const updateUser = createAsyncThunk(
  "user/update",
  async (
    userData: {
      name?: string;
      username?: string;
      email?: string;
      birthDate?: string;
    },
    { getState }
  ) => {
    const { id } = (getState() as RootState).user;
    const response = await axios.put(`${API_URL}/${id}`, userData);
    return response.data;
  }
);

const initialState: UserState = {
  id: null,
  name: "",
  username: "",
  email: "",
  birthDate: "",
  status: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.birthDate = action.payload.birthDate;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.birthDate = action.payload.birthDate;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.name = action.payload.name;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.birthDate = action.payload.birthDate;
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
