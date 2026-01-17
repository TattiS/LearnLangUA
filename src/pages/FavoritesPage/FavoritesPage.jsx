import clsx from "clsx";
import css from "./FavoritesPage.module.css";
import { getFavorites } from "../../features/LSHelper";
import TeachersList from "../../components/TeachersList/TeachersList";
import { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { database } from "../../firebase/firebase";

const FavoritesPage = () => {
  const [favoriteTeachers, setFavoriteTeachers] = useState([]);
  useEffect(() => {
    const favTeacherIds = getFavorites();

    const fetchTeachers = async () => {
      const teachers = await Promise.all(
        favTeacherIds.map(async (id) => {
          const result = await get(ref(database, `teachers/${id}`));
          return result.exists() ? { id: result.key, ...result.val() } : null;
        })
      );
      setFavoriteTeachers(teachers.filter(Boolean));
    };

    fetchTeachers();
  }, []);
  return (
    <div className={clsx(css.section, css.favoritesPageWrapper, "container")}>
      <TeachersList teachers={favoriteTeachers} />
    </div>
  );
};
export default FavoritesPage;
