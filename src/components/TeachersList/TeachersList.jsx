import css from "./TeachersList.module.css";
import TeacherCard from "../TeacherCard/TeacherCard";
import { selectIsAuthorized } from "../../redux/authSelectors";
import { useSelector } from "react-redux";
const TeachersList = ({ teachers }) => {
  const isAuthorized = useSelector(selectIsAuthorized);
  if (!teachers.length) {
    return <p>No teachers found</p>;
  }

  return (
    <>
      <div className={css.teacherListWrapper}>
        <ul className={css.teacherList}>
          {teachers.map((teacher) => (
            <li key={teacher.id} className={css.teacherCard}>
              <TeacherCard teacher={teacher} isAuthorized={isAuthorized} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default TeachersList;
