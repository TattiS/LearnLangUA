import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeFilter: null,
  values: {
    language: null,
    level: null,
    price: null,
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter(state, action) {
      const { type, value } = action.payload;
      if (type && !value) {
        state.values[type] = null;
        const activeFilter = Object.keys(state.values).find(
          (key) => state.values[key] != null
        );
        state.activeFilter = activeFilter || null;
        return;
      }
      state.activeFilter = type;
      state.values[type] = value;
    },
    resetFilters(state) {
      state.activeFilter = null;
      Object.keys(state.values).forEach((key) => {
        state.values[key] = null;
      });
    },
  },
});
export const { setFilter, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
