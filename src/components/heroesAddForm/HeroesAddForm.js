// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров
//ВЫПОЛНЕНО

import { v4 as uuidv4 } from "uuid";
import { useHttp } from "../../hooks/http.hook";
import {
  heroAdd,
  heroesFetchingError,
  getFilters,
} from "../../actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const HeroesAddForm = () => {
  const { filters } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    request("http://localhost:3001/filters")
      .then((data) => dispatch(getFilters(data)))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.id = uuidv4();

    request(`http://localhost:3001/heroes/`, "POST", JSON.stringify(data))
      .then((data) => {
        dispatch(heroAdd(data));
        e.target.reset();
      })
      .catch(() => heroesFetchingError());
  };

  const renderFilters = (filters) => {
    return filters.map((item) => {
      // if (item.name === "all") return;
      return (
        <option key={item.id} value={item.name}>
          {item.label}
        </option>
      );
    });
  };

  const elements = renderFilters(filters);

  return (
    <form className="border p-4 shadow-lg rounded" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label fs-4">
          Описание
        </label>
        <textarea
          required
          name="description"
          className="form-control"
          id="description"
          placeholder="Что я умею?"
          style={{ height: "130px" }}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select required className="form-select" id="element" name="element">
          <option value="" hidden>
            Я владею элементом...
          </option>
          {elements}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
