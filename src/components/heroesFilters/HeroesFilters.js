import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { changeActiveFilter } from "../heroesFilters/filtersSlice";
import { fetchFilters } from "../heroesFilters/filtersSlice";
import { selectAll } from "../heroesFilters/filtersSlice";

const HeroesFilters = () => {
  const filters = useSelector(selectAll);
  const activeFilter = useSelector((state) => state.filters.activeFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilters());
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
