//этот файл не используется (только в вызове configureStore), весь функционал заменил собой createApi

import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const heroesAdapter = createEntityAdapter();

// const initialState = { // состояние без использования createEntityAdapter
//   heroes: [],
//   heroesLoadingStatus: "idle",
// };

const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: "idle",
});

export const fetchHeroes = createAsyncThunk("heroes/fetchHeroes", async () => {
  const { request } = useHttp();
  return await request("/api/heroes");
});

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    // heroesFetching: (state) => {
    //   state.heroesLoadingStatus = "loading"; //эти действия уже используются в createAsyncThunk, тут еще раз они не нужны
    // },
    // heroesFetched: (state, action) => {
    //   state.heroes = action.payload;
    //   state.heroesLoadingStatus = "idle";
    // },
    // heroesFetchingError: (state) => {
    //   state.heroesLoadingStatus = "error";
    // },
    heroAdd: (state, action) => {
      // state.heroes.push(action.payload);
      heroesAdapter.addOne(state, action.payload);
    },
    heroDelete: (state, action) => {
      // state.heroes = state.heroes.filter((item) => item.id !== action.payload);
      heroesAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.heroesLoadingStatus = "loading";
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        {
          state.heroesLoadingStatus = "idle";
          // state.heroes = action.payload;
          heroesAdapter.setAll(state, action.payload);
        }
      })
      .addCase(fetchHeroes.rejected, (state) => {
        state.heroesLoadingStatus = "error";
      });
  },
});

const { actions, reducer } = heroesSlice;

export default reducer;

const { selectAll } = heroesAdapter.getSelectors((state) => state.heroes);

export const filteredHeroes = createSelector(
  (state) => state.filters.activeFilter,
  selectAll,
  (filter, heroes) => {
    if (filter === "all") {
      return heroes;
    } else {
      return heroes.filter((item) => item.element === filter);
    }
  }
);

export const {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroAdd,
  heroDelete,
} = actions;
