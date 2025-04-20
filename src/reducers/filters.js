const initialState = {
  filters: [],
  activeFilter: "all",
};

const filters = (state = initialState, action) => {
  switch (action.type) {
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

export default filters;
