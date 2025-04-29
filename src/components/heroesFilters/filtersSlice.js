import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: [],
  activeFilter: "all",
  filtersLoadingStatus: "idle",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    filtersFetching: (state) => {
      state.filtersLoadingStatus = "loading";
    },

    filtersFetched: (state, action) => {
      state.filters = action.payload;
      state.filtersLoadingStatus = "idle";
    },
    filtersFetchingError: (state) => {
      state.filtersLoadingStatus = "error";
    },
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
});

const { actions, reducer } = filterSlice;
export default reducer;
export const {
  filtersFetched,
  filtersFetching,
  filtersFetchingError,
  changeActiveFilter,
} = actions;
