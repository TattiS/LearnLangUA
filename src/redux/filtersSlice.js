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
      state.activeFilter = type;
      Object.keys(state.values).forEach((key) => {
        state.values[key] = key === type ? value : null;
      });
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
