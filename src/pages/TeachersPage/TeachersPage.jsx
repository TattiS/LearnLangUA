import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFiltersState } from "../../redux/filtersSelectors";
import { selectTeachers } from "../../redux/teachersSelectors";
import { resetTeachers, fetchTeachers } from "../../redux/teachersSlice";
import Filters from "../../components/Filters/Filters";
import TeachersList from "../../components/TeachersList/TeachersList";
import LoadMore from "../../components/LoadMore/LoadMore";
import clsx from "clsx";
import css from "./TeachersPage.module.css";

const TeachersPage = () => {
  const filters = useSelector(selectFiltersState);
  const teachers = useSelector(selectTeachers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetTeachers());
    dispatch(fetchTeachers());
  }, [filters, dispatch]);
  return (
    <div className={clsx(css.section, css.teachersPageWrapper, "container")}>
      <Filters />
      <TeachersList teachers={teachers} />
      <LoadMore className={css.loadMore} />
    </div>
  );
};
export default TeachersPage;
