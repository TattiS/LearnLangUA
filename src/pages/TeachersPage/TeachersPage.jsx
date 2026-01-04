import Filters from "../../components/Filters/Filters";
import TeachersList from "../../components/TeachersList/TeachersList";
import LoadMore from "../../components/LoadMore/LoadMore";

const TeachersPage = () => {
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
