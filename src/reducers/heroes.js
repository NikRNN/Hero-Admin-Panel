import { createReducer } from "@reduxjs/toolkit";

import {
  heroAdd,
  heroDelete,
  heroesFetched,
  heroesFetching,
  heroesFetchingError,
} from "../actions";

const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
};

const heroes = createReducer(initialState, (builder) => {
  //создание редьюсера через createReducer, immer соблюдает иммутабельность за меня
  builder
    .addCase(heroesFetching, (state) => {
      state.heroesLoadingStatus = "loading";
    })
    .addCase(heroesFetched, (state, action) => {
      state.heroes = action.payload;
      state.heroesLoadingStatus = "idle";
    })
    .addCase(heroesFetchingError, (state) => {
      state.heroesLoadingStatus = "error";
    })
    .addCase(heroAdd, (state, action) => {
      state.heroes.push(action.payload);
    })
    .addCase(heroDelete, (state, action) => {
      state.heroes = state.heroes.filter((item) => item.id !== action.payload);
    })
    .addDefaultCase(() => {});
});

// const heroes = (state = initialState, action) => { //классический редьюсер, соблюдаем иммутабельность
//   switch (action.type) {
//     case "HEROES_FETCHING":
//       return {
//         ...state,
//         heroesLoadingStatus: "loading",
//       };

//     case "HEROES_FETCHED":
//       return {
//         ...state,
//         heroes: action.payload,
//         heroesLoadingStatus: "idle",
//       };
//     case "HEROES_FETCHING_ERROR":
//       return {
//         ...state,
//         heroesLoadingStatus: "error",
//       };

//     case "HEROES_DELETE":
//       return {
//         ...state,
//         heroes: state.heroes.filter((hero) => hero.id !== action.payload),
//       };

//     case "HERO_ADD":
//       return {
//         ...state,
//         heroes: [...state.heroes, action.payload],
//       };

//     default:
//       return state;
//   }
// };

export default heroes;
