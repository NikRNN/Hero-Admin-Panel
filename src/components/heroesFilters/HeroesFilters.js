import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import { changeActiveFilter } from "../heroesFilters/filtersSlice";
import { fetchFilters } from "../../actions";

const HeroesFilters = () => {
  const filters = useSelector((state) => state.filters.filters);
  const activeFilter = useSelector((state) => state.filters.activeFilter);
  const { request } = useHttp();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilters(request));
    // request("http://localhost:3001/filters")
    //   .then((data) => dispatch(filtersFetched(data)))
    //   .catch(() => dispatch(filtersFetchingError()));
  }, []);

  const renderFilters = (arr) => {
    return arr.map((item) => {
      const btnClass = classNames(item.className, {
        active: activeFilter === item.name,
      });

      return (
        <button
          key={item.name}
          className={btnClass}
          value={item.name}
          onClick={(e) => makeFilteredHeroes(e)}
        >
          {item.label}
        </button>
      );
    });
  };

  const makeFilteredHeroes = (e) => {
    dispatch(changeActiveFilter(e.target.value));
  };

  const elements = renderFilters(filters);

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">{elements}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;
