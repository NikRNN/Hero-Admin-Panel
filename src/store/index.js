import { configureStore } from "@reduxjs/toolkit";

import heroes from "../reducers/heroes";
import filters from "../reducers/filters";

const strMiddleware = (store) => (next) => (action) => {
  if (typeof action === "string") {
    return next({ type: action });
  }
  return next(action);
};

const enhancer =
  (createStore) =>
  (...args) => {
    const store = createStore(...args);
    const oldDispatch = store.dispatch;
    store.dispatch = (action) => {
      if (typeof action === "string") {
        return oldDispatch({ type: action });
      }
      return oldDispatch(action);
    };
    return store;
  };

//по сути enhancer и middleware тут выполняют одно и то же. enhancer просто оставил дял примера синтаксиса

const store = configureStore({
  reducer: {
    heroes,
    filters,
  },
  enhancers: (getDefaultEnhancers) => [...getDefaultEnhancers(), enhancer],
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    strMiddleware,
  ],
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
