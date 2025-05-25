import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicAPI } from "../services/publicAPI";
import { LOGIN, LOGINAPI } from "../services/apiURL";
import toast from "../utils/toast";
import { setAccessToken } from "../utils/utils";

const initialState = {
  isLoading: false,
  hasError: false,
  user: null,
};

export const userLogin = createAsyncThunk(
  "auth/user-login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await publicAPI.post(LOGIN, payload);
      if (res?.data?.success) {
        const { accessToken } = res.data.data;
        setAccessToken(accessToken);
        toast.success(res.data.message || "Login successful");
        return true;
      } else {
        const msg =
          res?.data?.message || "Login failed, please try again later";
        console.error(msg);
        return rejectWithValue(msg);
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error.message ||
        "An unknown error occurred. Please try again later.";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  exytraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(userLogin.fulfilled, (state) => {
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(userLogin.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
