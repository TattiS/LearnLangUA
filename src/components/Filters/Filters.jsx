import { useDispatch, useSelector } from "react-redux";
import css from "./Filters.module.css";
import { setFilter, resetFilters } from "../../redux/filtersSlice";
import {
  selectMetaLanguages,
  selectMetaLevels,
  selectMetaPrices,
} from "../../redux/filtersMetaSelectors";
import { selectFilterValues } from "../../redux/filtersSelectors";

const Filters = () => {
  const languages = useSelector(selectMetaLanguages);
  const levels = useSelector(selectMetaLevels);
  const prices = useSelector(selectMetaPrices);

  const values = useSelector(selectFilterValues);

  const dispatch = useDispatch();
  const filterChangeHandler = (e) => {
    const { name, value } = e.target;
    dispatch(setFilter({ type: name, value }));
  };
  const resetHandler = () => {
    dispatch(resetFilters());
  };

  return (
    <section className={css.filters} aria-label="Filters">
      <form className={css.form}>
        <div className={css.group}>
          <label className={css.label} htmlFor="filter-language">
            Languages
          </label>

          <select
            id="filter-language"
            name="language"
            className={css.select}
            value={values.language || ""}
            onChange={filterChangeHandler}
          >
            <option value="">Select language</option>

            {languages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>

        <div className={css.group}>
          <label className={css.label} htmlFor="filter-level">
            Level of knowledge
          </label>

          <select
            id="filter-level"
            name="level"
            className={css.select}
            value={values.level || ""}
            onChange={filterChangeHandler}
          >
            <option value="">Select level</option>

            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div className={css.group}>
          <label className={css.label} htmlFor="filter-price">
            Price
          </label>

          <select
            id="filter-price"
            name="price"
            className={css.select}
            value={values.price || ""}
            onChange={filterChangeHandler}
          >
            <option value="">Any</option>

            {prices.map((price) => (
              <option key={price} value={price}>
                {price} $
              </option>
            ))}
          </select>
        </div>
        <button type="button" onClick={resetHandler}>
          Reset filters
        </button>
      </form>
    </section>
  );
};

export default Filters;
