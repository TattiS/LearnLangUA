import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  teachers: [],
  lastKey: null,
  hasMore: true,
  loading: false,
  error: null,
  filters: {
    language: null,
    level: null,
    price: null,
  },
};

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchInitial",
  async () => {}
);
export const fetchMoreTeachers = createAsyncThunk();

const teachersSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    resetTeachers(state) {
      state.teachers = [];
      state.lastKey = null;
      state.hasMore = true;
      state.loading = false;
      state.error = null;
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {},
});
