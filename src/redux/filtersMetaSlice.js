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

    const result = await get(metaRef);

    if (!result.exists()) {
      return {
        languages: [],
        levels: [],
        prices: [],
      };
    }

    const data = result.val();
    console.log("Fetched filters meta:", data);

    return {
      languages: data[0].languages || [],
      levels: data[0].levels || [],
      prices: data[0].prices || [],
    };
  }
);

const filtersMetaSlice = createSlice({
  name: "filtersMeta",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiltersMeta.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFiltersMeta.fulfilled, (state, action) => {
        state.languages = action.payload.languages;
        state.levels = action.payload.levels;
        state.prices = action.payload.prices;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchFiltersMeta.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});
export default filtersMetaSlice.reducer;
