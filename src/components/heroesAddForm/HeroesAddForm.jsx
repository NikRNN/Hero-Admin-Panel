import { v4 as uuidv4 } from "uuid";

import { fetchFilters } from "../heroesFilters/filtersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectAll } from "../heroesFilters/filtersSlice";
import { useCreateHeroMutation } from "../../api/apiSlice";

const HeroesAddForm = () => {
  const [createHero, { isLoading }] = useCreateHeroMutation();

  const filters = useSelector(selectAll);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilters());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.id = uuidv4();

    // request(`http://localhost:3001/heroes/`, "POST", JSON.stringify(data)) //вместо этого функционала теперь запросы через apiSlice
    //   .then((data) => {
    //     dispatch(heroAdd(data));
    //     e.target.reset();
    //   })
    //   .catch(() => heroesFetchingError());
    createHero(data).unwrap();
    e.target.reset();
  };

  const renderFilters = (filters) => {
    return filters.map((item) => {
      if (item.name === "all") return;
      return (
        <option key={item.name} value={item.name}>
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
