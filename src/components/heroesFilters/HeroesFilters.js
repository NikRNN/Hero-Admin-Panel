// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import { getFilters, changeActiveFilter } from "../../actions";

const HeroesFilters = () => {
  const { filters, activeFilter, heroes } = useSelector((state) => state);
  const { request } = useHttp();
  const dispatch = useDispatch();

  useEffect(() => {
    request("http://localhost:3001/filters")
      .then((data) => dispatch(getFilters(data)))
      .catch((err) => console.log(err));
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
