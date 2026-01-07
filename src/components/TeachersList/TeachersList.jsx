import css from "./TeachersList.module.css";
import TeacherCard from "../TeacherCard/TeacherCard";
import { selectTeachers } from "../../redux/teachersSelectors";
import { useSelector } from "react-redux";
const TeachersList = () => {
  const teachers = useSelector(selectTeachers);

  if (!teachers.length) {
    return <p>No teachers found</p>;
  }

  return (
    <>
      <div>TeachersList</div>
      <ul>
        {teachers.map((teacher) => (
          <li key={teacher.id} className={css.teacherCard}>
            <TeacherCard teacher={teacher} />
          </li>
        ))}
      </ul>
    </>
  );
};
export default TeachersList;
