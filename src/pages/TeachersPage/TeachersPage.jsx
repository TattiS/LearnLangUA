import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFiltersState } from "../../redux/filtersSelectors";
import { resetTeachers, fetchTeachers } from "../../redux/teachersSlice";
import Filters from "../../components/Filters/Filters";
import TeachersList from "../../components/TeachersList/TeachersList";
import LoadMore from "../../components/LoadMore/LoadMore";

const TeachersPage = () => {
  const filters = useSelector(selectFiltersState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetTeachers());
    dispatch(fetchTeachers());
  }, [filters, dispatch]);
  return (
    <>
      <h1>Teachers Page</h1>
      <Filters />
      <TeachersList />
      <LoadMore />
    </>
  );
};
export default TeachersPage;
