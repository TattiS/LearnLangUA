import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ref,
  get,
  query,
  orderByChild,
  orderByKey,
  equalTo,
  startAfter,
  limitToFirst,
} from "firebase/database";
import { database } from "../firebase/firebase";

const initialState = {
  teachers: [],
  lastKey: null,
  hasMore: true,
  loading: false,
  error: null,
};

const PAGE_LIMIT = 4;

export const buildTeachersQuery = ({ filter, lastKey, pageSize }) => {
  const teachersRef = ref(database, "teachers");

  const constraints = [];

  if (
    filter?.field &&
    filter.value !== undefined &&
    filter.value !== null &&
    filter.value !== ""
  ) {
    constraints.push(orderByChild(filter.field));
    constraints.push(equalTo(filter.value));
  } else {
    constraints.push(orderByKey());

    if (lastKey) {
      constraints.push(startAfter(lastKey));
    }

    constraints.push(limitToFirst(pageSize));
  }

  console.log("RTDB constraints:", constraints);

  return query(teachersRef, ...constraints);
};

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchInitial",
  async (_, thunkAPI) => {
    const { activeFilter, values } = thunkAPI.getState().filters;
    const filterValue = activeFilter ? values[activeFilter] : null;
    const teachersQuery = buildTeachersQuery({
      filter: activeFilter ? { field: activeFilter, value: filterValue } : null,
      pageSize: PAGE_LIMIT,
    });
    const response = await get(teachersQuery);
    if (!response.exists()) {
      return { teachers: [], lastKey: null };
    }

    const data = Object.entries(response.val());
    const teachers = data.map(([id, teacherInfo]) => ({ id, ...teacherInfo }));

    return {
      teachers: teachers,
      lastKey: data.at(-1)[0],
      hasMore: data.length === PAGE_LIMIT,
    };
  }
);

export const fetchMoreTeachers = createAsyncThunk(
  "teachers/fetchMore",
  async (_, thunkAPI) => {
    const { lastKey, hasMore } = thunkAPI.getState().teachers;

    if (!hasMore) return thunkAPI.rejectWithValue();

    const { activeFilter, values } = thunkAPI.getState().filters;
    const filterValue = activeFilter ? values[activeFilter] : null;

    const teacherQuery = buildTeachersQuery({
      filter: activeFilter ? { field: activeFilter, value: filterValue } : null,
      lastKey,
      pageSize: PAGE_LIMIT,
    });
    const response = await get(teacherQuery);
    if (!response.exists()) {
      return { teachers: [], hasMore: false };
    }
    const data = Object.entries(response.val());
    const teachers = data.map(([id, teacherInfo]) => ({ id, ...teacherInfo }));
    return {
      teachers: teachers,
      lastKey: data.at(-1)[0],
      hasMore: data.length === PAGE_LIMIT,
    };
  }
);

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.teachers = action.payload.teachers;
        state.lastKey = action.payload.lastKey;
        state.hasMore = action.payload.hasMore;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTeachers.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchMoreTeachers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMoreTeachers.fulfilled, (state, action) => {
        state.teachers = [...state.teachers, ...action.payload.teachers];
        state.lastKey = action.payload.lastKey;
        state.hasMore = action.payload.hasMore;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchMoreTeachers.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});
export const { resetTeachers } = teachersSlice.actions;
export default teachersSlice.reducer;
