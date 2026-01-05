import { useDispatch, useSelector } from "react-redux";
import css from "./Filters.module.css";
import { setFilter } from "../../redux/filtersSlice";
import { resetTeachers, fetchTeachers } from "../../redux/teachersSlice";
import {
  selectMetaLanguages,
  selectMetaLevels,
  selectMetaPrices,
} from "../../redux/filtersMetaSelectors";
const Filters = () => {
  const languages = useSelector(selectMetaLanguages);
  const levels = useSelector(selectMetaLevels);
  const prices = useSelector(selectMetaPrices);

  const dispatch = useDispatch();
  const filterChangeHandler = (e) => {
    const { type, value } = e.target;
    dispatch(setFilter({ type, value }));
    dispatch(resetTeachers());
    dispatch(fetchTeachers());
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
      </form>
    </section>
  );
};

export default Filters;
