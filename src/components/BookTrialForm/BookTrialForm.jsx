import css from "./BookTrialForm.module.css";

const BookTrialForm = ({ teacher, onClose }) => {
  return (
    <div className={css.formTrialContainer}>
      <h1 className={css.bookTrialFormTitle}>Book trial lesson</h1>
      <p className={css.bookTrialFormTxt}>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>

      <div className={css.trialAvatarWrapper}>
        <img
          className={css.teacherTrialAvatar}
          src={teacher.avatar_url || "/images/avatar-placeholder.webp"}
          alt={`Photo of ${teacher.name}`}
          width="44"
          height="44"
          loading="lazy"
        />
        <div className={css.trialAvatarInfo}>
          <p className={css.trialAvatarTxt}>Your teacher</p>
          <p className={css.trialAvatarName}>{teacher.name}</p>
        </div>
      </div>
      <form className={css.bookTrialForm}>
        <fieldset className={css.bookTrialReasonFieldset}>
          <legend className={css.bookTrialFormLegend}>
            What is your main reason for learning English?
          </legend>

          <div className={css.bookTrialRadioGroup}>
            <label className="radioOption">
              <input
                type="radio"
                name="reason"
                value="career-business"
                className={css.radioInput}
              />
              <span className={css.radioControl} />
              <span className={css.radioLabel}>Career and business</span>
            </label>
            <label className="radioOption">
              <input
                type="radio"
                name="reason"
                value="lesson-for-kids"
                className={css.radioInput}
              />
              <span className={css.radioControl} />
              <span className="radioLabel">Lesson for kids</span>
            </label>
            <label className="radioOption">
              <input
                type="radio"
                name="reason"
                value="living-abroad"
                className={css.radioInput}
              />
              <span className={css.radioControl} />
              <span className="radioLabel">Living abroad</span>
            </label>
            <label className="radioOption">
              <input
                type="radio"
                name="reason"
                value="exams-coursework"
                className={css.radioInput}
              />
              <span className={css.radioControl} />
              <span className="radioLabel">Exams and coursework</span>
            </label>
            <label className="radioOption">
              <input
                type="radio"
                name="reason"
                value="culture-travel-hobby"
                className={css.radioInput}
              />
              <span className={css.radioControl} />
              <span className="radioLabel">Culture, travel or hobby</span>
            </label>
          </div>
        </fieldset>

        <div className="fieldGroup">
          <label className="fieldLabel" htmlFor="full-name">
            Full Name
          </label>
          <input
            id="full-name"
            name="fullName"
            type="text"
            className="textInput"
            placeholder="Full Name"
          />
        </div>

        <div className="fieldGroup">
          <label className="fieldLabel" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="textInput"
            placeholder="Email"
          />
        </div>

        <div className="fieldGroup">
          <label className="fieldLabel" htmlFor="phone-number">
            Phone number
          </label>
          <input
            id="phone-number"
            name="phoneNumber"
            type="tel"
            className="textInput"
            placeholder="Phone number"
          />
        </div>

        <button type="submit" className="primaryButton" onClose={onClose}>
          Book
        </button>
      </form>
    </div>
  );
};
export default BookTrialForm;
