import css from "./HomePage.module.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  const statsData = [
    {
      value: "32,000+",
      label: "Experienced tutors",
    },
    {
      value: "300,000+",
      label: "5-star tutor reviews",
    },
    {
      value: "120+",
      label: "Subjects taught",
    },
    {
      value: "200+",
      label: "Tutor nationalities",
    },
  ];
  return (
    <div className={`${css.container} container`}>
      <section className={`${css.heroSection} section`}>
        <div className={css.heroWrapper}>
          <div className={css.heroContentWrapper}>
            <h1 className={css.heroTitle}>
              Unlock your potential with the best{" "}
              <span className={css.highlight}>language</span> tutors
            </h1>
            <p className={css.heroTxt}>
              Embark on an Exciting Language Journey with Expert Language
              Tutors: Elevate your language proficiency to new heights by
              connecting with highly qualified and experienced tutors.
            </p>
            <Link to="/teachers" className={css.heroBtn}>
              Get started
            </Link>
          </div>
          <div className={css.heroImgWrapper}>
            <img
              src="/hero.png"
              alt="Hero Illustration"
              width={391}
              height={450}
            />
          </div>
        </div>
        <div className={css.stats} aria-label="Platform statistics">
          <ul className={css.statsList}>
            {statsData.map(({ value, label }) => (
              <li key={label} className={css.statItem}>
                <strong className={css.statValue}>{value}</strong>
                <span className={css.statLabel}>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
