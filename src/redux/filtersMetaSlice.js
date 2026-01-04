import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ref, get } from "firebase/database";
import { database } from "../firebase/firebase";

const initialState = {
  languages: [],
  levels: [],
  prices: [],
  loading: false,
  error: null,
};

export const fetchFiltersMeta = createAsyncThunk(
  "filtersMeta/fetch",
  async () => {
    const metaRef = ref(database, "meta");

    const snapshot = await get(metaRef);

    if (!snapshot.exists()) {
      return {
        languages: [],
        levels: [],
        prices: [],
      };
    }

    const data = snapshot.val();

    return {
      languages: data.languages || [],
      levels: data.levels || [],
      prices: data.prices || [],
    };
  }
);

const filtersMetaSlice = createSlice({
  name: "filtersMeta",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiltersMeta.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFiltersMeta.fulfilled, (state, action) => {
        state.languages = action.payload.languages;
        state.levels = action.payload.levels;
        state.price_per_hour = action.payload.price_per_hour;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchFiltersMeta.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});
