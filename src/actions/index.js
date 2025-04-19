export const heroesFetching = () => {
  return {
    type: "HEROES_FETCHING",
  };
};

export const heroesFetched = (heroes) => {
  return {
    type: "HEROES_FETCHED",
    payload: heroes,
  };
};

export const heroesFetchingError = () => {
  return {
    type: "HEROES_FETCHING_ERROR",
  };
};

export const heroDelete = (id) => {
  return {
    type: "HEROES_DELETE",
    payload: id,
  };
};

export const heroAdd = (hero) => {
  return {
    type: "HERO_ADD",
    payload: hero,
  };
};

export const getFilters = (filters) => {
  return {
    type: "GET_FILTERS",
    payload: filters,
  };
};

export const changeActiveFilter = (filter) => {
  return {
    type: "CHANGE_ACTIVE_FILTER",
    payload: filter,
  };
};
