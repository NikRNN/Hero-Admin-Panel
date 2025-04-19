const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  filters: [],
  filteredHeroes: [],
  activeFilter: "all",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "HEROES_FETCHING":
      return {
        ...state,
        heroesLoadingStatus: "loading",
      };
    case "HEROES_FETCHED":
      return {
        ...state,
        heroes:
          state.activeFilter === "all"
            ? action.payload
            : action.payload.filter(
                (item) => item.element === state.activeFilter
              ),
        heroesLoadingStatus: "idle",
      };
    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error",
      };

    case "HEROES_DELETE":
      return {
        ...state,
        heroes: state.heroes.filter((hero) => hero.id !== action.payload),
      };

    case "HERO_ADD":
      return {
        ...state,
        heroes: [...state.heroes, action.payload],
      };

    case "GET_FILTERS":
      return {
        ...state,
        filters: action.payload,
      };

    case "CHANGE_ACTIVE_FILTER":
      return {
        ...state,
        activeFilter: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
