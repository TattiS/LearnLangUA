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
            <use href="/sprite.svg#icon-dot" />
          </svg>
        </div>
        <div className={css.contentCardWrapper}></div>
      </article>
    </>
  );
};
export default TeacherCard;
