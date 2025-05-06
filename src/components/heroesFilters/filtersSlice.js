import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

// const initialState = {
//   filters: [],
//   activeFilter: "all",
//   filtersLoadingStatus: "idle",
// };

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
  activeFilter: "all",
  filtersLoadingStatus: "idle",
});

export const fetchFilters = createAsyncThunk(
  "filters/fetchFilters",
  async () => {
    const { request } = useHttp();
    return await request("/api/filters");
  }
);

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    //тут были другие еще действия (по аналогии с heroesSlice, но тепреь они в extraReducers)
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.pending, (state) => {
        state.filtersLoadingStatus = "loading";
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        filtersAdapter.setAll(state, action.payload);
        state.filtersLoadingStatus = "idle";
      })
      .addCase(fetchFilters.rejected, (state) => {
        state.filtersLoadingStatus = "error";
      });
  },
});

const { actions, reducer } = filterSlice;

export const { selectAll } = filtersAdapter.getSelectors(
  (state) => state.filters
);

export default reducer;
export const {
  filtersFetched,
  filtersFetching,
  filtersFetchingError,
  changeActiveFilter,
} = actions;
