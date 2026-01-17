import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/authSlice.js";
import css from "./TeacherCard.module.css";
import clsx from "clsx";
import { getFavorites, saveFavorites } from "../../features/LSHelper";

const TeacherCard = ({ teacher, isAuthorized }) => {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!isAuthorized) return;

    const favorites = getFavorites();
    setIsFavorite(favorites.includes(teacher.id));
  }, [teacher.id, isAuthorized]);

  const favoriteBtnHandler = () => {
    if (!isAuthorized) {
      dispatch(openModal("login"));
      return;
    }

    const favorites = getFavorites();
    let updatedFavorites;

    if (favorites.includes(teacher.id)) {
      updatedFavorites = favorites.filter((id) => id !== teacher.id);
      setIsFavorite(false);
    } else {
      updatedFavorites = [...favorites, teacher.id];
      setIsFavorite(true);
    }

    saveFavorites(updatedFavorites);
  };
  return (
    <>
      <article>
        <div className={css.avatarWrapper}>
          <img
            className={css.teacherCardAvatar}
            src={teacher.avatar_url || "/images/avatar-placeholder.webp"}
            alt={`Photo of ${teacher.name}`}
            width="96"
            height="96"
            loading="lazy"
          />
          <svg className={css.teacherCardAvatarIcon} width="12" height="12">
            <use href="/sprite.svg#icon-point" />
          </svg>
        </div>
        <div className={css.contentCardWrapper}>
          <div className={css.contentCardHeader}>
            <p className={css.contentCardHeaderTitle}>Languages</p>
            <ul className={css.contentCardHeaderList}>
              <li className={css.contentCardHeaderItem}>
                <svg className={css.teacherCardBookIcon} width="16" height="16">
                  <use href="/sprite.svg#icon-book-open" />
                </svg>
                <p className={css.contentCardHeaderText}>Lessons online</p>
              </li>
              <li className={css.contentCardHeaderItem}>
                Lessons done: {teacher.lessons_done}
              </li>
              <li className={css.contentCardHeaderItem}>
                <svg className={css.teacherCardStarIcon} width="16" height="16">
                  <use href="/sprite.svg#icon-star" />
                </svg>
                <p>Rating: {teacher.rating}</p>
              </li>
              <li className={css.contentCardHeaderItem}>
                Price / 1 hour: <span>{teacher.price_per_hour}$</span>
              </li>
            </ul>
            <button
              type="button"
              className={css.teacherCardFavoriteBtn}
              aria-label="Add to favorites"
              onClick={favoriteBtnHandler}
            >
              <svg
                className={clsx(
                  css.teacherCardFavBtnIcon,
                  isFavorite && css.isActive
                )}
                width="25"
                height="22"
              >
                <use href="/sprite.svg#icon-heart-hovered"></use>
              </svg>
            </button>
          </div>
          <h2
            className={css.teacherCardName}
          >{`${teacher.name} ${teacher.surname}`}</h2>
          <div></div>
        </div>
      </article>
    </>
  );
};
export default TeacherCard;
