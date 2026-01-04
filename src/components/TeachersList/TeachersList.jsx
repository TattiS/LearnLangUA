import css from "./TeachersList.module.css";
import TeacherCard from "../TeacherCard/TeacherCard";
const TeachersList = ({ teachers = [] }) => {
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
