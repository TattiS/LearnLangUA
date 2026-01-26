import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFiltersState } from "../../redux/filtersSelectors";
import { selectTeachers } from "../../redux/teachersSelectors";
import { resetTeachers, fetchTeachers } from "../../redux/teachersSlice";
import Filters from "../../components/Filters/Filters";
import TeachersList from "../../components/TeachersList/TeachersList";
import LoadMore from "../../components/LoadMore/LoadMore";
import Modal from "../../components/Modal/Modal";
import BookTrialForm from "../../components/BookTrialForm/BookTrialForm";
import clsx from "clsx";
import css from "./TeachersPage.module.css";

const TeachersPage = () => {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const filters = useSelector(selectFiltersState);
  const teachers = useSelector(selectTeachers);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetTeachers());
    dispatch(fetchTeachers());
  }, [filters, dispatch]);

  const openBookModalHandler = (teacher) => {
    setSelectedTeacher(teacher);
    setIsBookModalOpen(true);
  };

  const closeBookModalHandler = () => {
    setIsBookModalOpen(false);
    setSelectedTeacher(null);
  };

  return (
    <>
      <div className={clsx(css.section, css.teachersPageWrapper, "container")}>
        <Filters />
        <TeachersList teachers={teachers} onBookClick={openBookModalHandler} />
        <LoadMore className={css.loadMore} />
      </div>
      {isBookModalOpen && selectedTeacher && (
        <Modal onClose={closeBookModalHandler}>
          <BookTrialForm
            teacher={selectedTeacher}
            onClose={closeBookModalHandler}
          />
        </Modal>
      )}
    </>
  );
};
export default TeachersPage;
