import { useHttp } from "../../hooks/http.hook";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroDelete,
} from "../../actions";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

const HeroesList = () => {
  //
  const filteredHeroes = createSelector(
    (state) => state.filters.activeFilter,
    (state) => state.heroes.heroes,
    (filter, heroes) => {
      if (filter === "all") {
        return heroes;
      } else {
        return heroes.filter((item) => item.element === filter);
      }
    }
  );

  console.log(filteredHeroes);

  const heroes = useSelector(filteredHeroes);

  const heroesLoadingStatus = useSelector(
    (state) => state.heroes.heroesLoadingStatus
  );
  const activeFilter = useSelector((state) => state.filters.activeFilter);

  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));
  }, [activeFilter]);

  const onDelete = useCallback(
    (id) => {
      request(`http://localhost:3001/heroes/${id}`, "DELETE")
        .then((res) => dispatch(heroDelete(id)))
        .catch((err) => console.log(err));
    },
    [request]
  );

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>;
    }

    return arr.map(({ id, ...props }) => {
      return <HeroesListItem key={id} {...props} onDelete={onDelete} id={id} />;
    });
  };

  const elements = renderHeroesList(heroes);
  return <ul>{elements}</ul>;
};

export default HeroesList;
