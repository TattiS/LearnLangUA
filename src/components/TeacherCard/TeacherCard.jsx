import css from "./TeacherCard.module.css";

const TeacherCard = ({ teacher }) => {
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
            <p className={css.contentCardHeaderLbl}>Languages</p>
            <div className={css.contentCardHeaderTxtWrapper}>
              <p className={css.contentCardHeaderText}>Lessons online</p>
              <p className={css.contentCardHeaderText}>
                Lessons done: {teacher.lessons_done}
              </p>
              <p className={css.contentCardHeaderText}>
                Rating: {teacher.rating}
              </p>
              <p className={css.contentCardHeaderText}>
                Price / 1 hour: <span>{teacher.price_per_hour}$</span>
              </p>
            </div>
            <button
              type="button"
              className={css.teacherCardFavoriteBtn}
              aria-label="Add to favorites"
            ></button>
          </div>
          <h2
            className={css.teacherCardName}
          >{`${teacher.name} ${teacher.surname}`}</h2>
        </div>
      </article>
    </>
  );
};
export default TeacherCard;
