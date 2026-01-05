export const selectFiltersState = (state) => state.filters;

export const selectActiveFilter = (state) =>
  selectFiltersState(state).activeFilter;

export const selectFilterValues = (state) => selectFiltersState(state).values;

export const selectLanguageFilter = (state) =>
  selectFiltersState(state).values.language;

export const selectLevelFilter = (state) =>
  selectFiltersState(state).values.level;

export const selectPriceFilter = (state) =>
  selectFiltersState(state).values.price;

export const selectIsFilterDisabled = (filterType) => (state) => {
  const active = selectActiveFilter(state);
  return active && active !== filterType;
};
