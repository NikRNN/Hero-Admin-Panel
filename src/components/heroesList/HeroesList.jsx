import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";
import { useGetHeroesQuery, useDeleteHeroMutation } from "../../api/apiSlice";
import "./heroesList.scss";

const HeroesList = () => {
  const {
    data: heroes = [], //сами данные, которые получили с сервера; задали значение по умолчанию на случай, если данные будут долго грузится, а код пойдет выполняться ниже
    isFetching, //тру, когда мы в последующем обращаемся к серверу
    isLoading, //тру, когда мы в ПЕРВЫЙ раз обращаемся к серверу
    isSuccess, //тру, когда данные с успехом загрузились
    isError, //тру, когда ошибка при общении с сервером
    error, // сама ошибка
  } = useGetHeroesQuery();

  const [deleteHero] = useDeleteHeroMutation();

  const activeFilter = useSelector((state) => state.filters.activeFilter);
  const heroesFiltered = useMemo(() => {
    const heroesFiltered = heroes.slice();
    if (activeFilter === "all") {
      return heroesFiltered;
    } else {
      return heroesFiltered.filter((item) => item.element === activeFilter);
    }
  }, [heroes, activeFilter]);

  const onDelete = useCallback((id) => {
    // request(`http://localhost:3001/heroes/${id}`, "DELETE")
    //   .then(() => dispatch(heroDelete(id)))
    //   .catch((err) => console.log(err));
    deleteHero(id);
  }, []);

  if (isLoading) {
    //из нашего хука
    return <Spinner />;
  } else if (isError) {
    // из нашего хука
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

  const elements = renderHeroesList(heroesFiltered);
  return <TransitionGroup component="ul">{elements}</TransitionGroup>;
};

export default HeroesList;
