import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useHttp } from "../../hooks/http.hook";
import { heroDelete, fetchHeroes, filteredHeroes } from "./heroesSlice";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";
import "./heroesList.scss";

const HeroesList = () => {
  const heroes = useSelector(filteredHeroes);
  const heroesLoadingStatus = useSelector(
    (state) => state.heroes.heroesLoadingStatus
  );
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchHeroes());
    // request("http://localhost:3001/heroes")
    //   .then((data) => dispatch(heroesFetched(data)))
    //   .catch(() => dispatch(heroesFetchingError()));
  }, []);

  const onDelete = useCallback(
    (id) => {
      request(`http://localhost:3001/heroes/${id}`, "DELETE")
        .then(() => dispatch(heroDelete(id)))
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
      return (
        <CSSTransition timeout={0} classNames="hero">
          <h5 className="text-center mt-5">Героев пока нет</h5>
        </CSSTransition>
      );
    }

    return arr.map(({ id, ...props }) => {
      return (
        <CSSTransition timeout={500} classNames="hero" key={id}>
          <HeroesListItem {...props} onDelete={() => onDelete(id)} />
        </CSSTransition>
      );
    });
  };

  const elements = renderHeroesList(heroes);
  return <TransitionGroup component="ul">{elements}</TransitionGroup>;
};

export default HeroesList;
