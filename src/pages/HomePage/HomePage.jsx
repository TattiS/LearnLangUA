import css from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={`${css.container} container`}>
      <div className={`${css.heroSection} section`}>
        <div className={css.heroContentWrapper}>
          <h1 className={css.heroTitle}></h1>
          <p className={css.heroTxt}></p>
          <button className={css.heroBtn}></button>
        </div>
        <div className={css.heroImgWrapper} width={568} height={530}>
          <img src="../../../public/hero.png" alt="Hero Illustration" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
