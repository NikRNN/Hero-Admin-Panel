import {
  heroesFetching,
  heroesFetchingError,
  heroesFetched,
} from "../components/heroesList/heroesSlice";

import {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
} from "../components/heroesFilters/filtersSlice";

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

// // export const heroesFetched = (heroes) => { //оставил для примера использование createAction и стандартный синтаксис
// //   return {
// //     type: "HEROES_FETCHED",
// //     payload: heroes,
// //   };
// // };
// export const heroesFetched = createAction("HEROES_FETCHED");

// // export const heroesFetchingError = () => {
// //   return {
// //     type: "HEROES_FETCHING_ERROR",
// //   };
// // };
