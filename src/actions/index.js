import { createAction } from "@reduxjs/toolkit";

export const fetchHeroes = (request) => (dispatch) => {
  dispatch(heroesFetching());
  request("http://localhost:3001/heroes")
    .then((data) => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()));
};

export const fetchFilters = (request) => (dispatch) => {
  dispatch(filtersFetching());
  request("http://localhost:3001/filters")
    .then((data) => dispatch(filtersFetched(data)))
    .catch(() => dispatch(filtersFetchingError()));
};

// export const heroesFetching = () => {
//   return {
//     type: "HEROES_FETCHING",
//   };
// };

export const heroesFetching = createAction("HEROES_FETCHING");

// export const heroesFetched = (heroes) => {
//   return {
//     type: "HEROES_FETCHED",
//     payload: heroes,
//   };
// };
export const heroesFetched = createAction("HEROES_FETCHED");

// export const heroesFetchingError = () => {
//   return {
//     type: "HEROES_FETCHING_ERROR",
//   };
// };

export const heroesFetchingError = createAction("HEROES_FETCHING_ERROR");

// export const heroAdd = (hero) => {
//   return {
//     type: "HERO_ADD",
//     payload: hero,
//   };
// };

export const heroAdd = createAction("HERO_ADD");

// export const heroDelete = (id) => {
//   return {
//     type: "HEROES_DELETE",
//     payload: id,
//   };
// };

export const heroDelete = createAction("HEROES_DELETE");

// export const filtersFetching = () => {
//   return {
//     type: "FILTERS_FETCHING",
//   };
// };

export const filtersFetching = createAction("FILTERS_FETCHING");

// export const filtersFetched = (filters) => {
//   return {
//     type: "FILTERS_FETCHED",
//     payload: filters,
//   };
// };

export const filtersFetched = createAction("FILTERS_FETCHED");

// export const filtersFetchingError = () => {
//   return { type: "FILTERS_FETCHING_ERROR" };
// };

export const filtersFetchingError = createAction("FILTERS_FETCHING_ERROR");

// export const changeActiveFilter = (filter) => {
//   return { type: "CHANGE_ACTIVE_FILTER", payload: filter };
// };

export const changeActiveFilter = createAction("CHANGE_ACTIVE_FILTER");
