import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser } from "../firebase/authService";
import { normalizeUser } from "./normalizeUser";

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (form, { rejectWithValue }) => {
    try {
      return normalizeUser(await registerUser(form));
    } catch (error) {
      return rejectWithValue(error.code || "auth/register_failed");
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (form, { rejectWithValue }) => {
    try {
      return normalizeUser(await loginUser(form));
    } catch (error) {
      return rejectWithValue(error.code || "auth/login_failed");
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutUser();
      return true;
    } catch (error) {
      return rejectWithValue(error.code || "auth/logout_failed");
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
  modal: {
    isOpen: false,
    type: null,
  },
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    openModal: (state, { payload }) => {
      state.modal.isOpen = true;
      state.modal.type =
        typeof payload === "string" ? payload : payload?.type || null;
    },
    closeModal: (state) => {
      state.modal.isOpen = false;
      state.modal.type = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(registerThunk.fulfilled, (state /*, { payload }*/) => {
        // state.user = payload;
        state.loading = false;
        state.modal.isOpen = false;
        state.modal.type = null;
      })
      .addCase(registerThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(loginThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state /*, { payload }*/) => {
        //state.user = payload;
        state.loading = false;
        state.modal.isOpen = false;
        state.modal.type = null;
      })
      .addCase(loginThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        // state.user = null;
        state.loading = false;
        state.modal.isOpen = false;
        state.modal.type = null;
      })
      .addCase(logoutThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { setUser, clearUser, clearAuthError, openModal, closeModal } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
