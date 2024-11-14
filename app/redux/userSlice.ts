import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
import { UserState } from "../types/types";

const API_URL = process.env.EXPO_PUBLIC_API_URL_USER;

if (!API_URL) {
  throw new Error("API URL is not defined");
}

export const fetchUser = createAsyncThunk("user/fetch", async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching user:", error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch user");
  }
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
    try {
      const { id } = (getState() as RootState).user;
      const response = await axios.put(`${API_URL}/${id}`, userData);
      return response.data;
    } catch (error: any) {
      console.error("Error updating user:", error.message);
      throw new Error(error.response?.data?.message || "Failed to update user");
    }
  }
);

const initialState: UserState = {
  id: null,
  name: "",
  username: "",
  email: "",
  birthDate: "",
  status: "idle",
  error: null,
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
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.birthDate = action.payload.birthDate;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user";
      });
    builder
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.name = action.payload.name;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.birthDate = action.payload.birthDate;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update user";
      });
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
