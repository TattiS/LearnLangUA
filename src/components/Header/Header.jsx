import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { openModal, logoutThunk } from "../../redux/authSlice.js";
import css from "./Header.module.css";
const Header = () => {
  const dispatch = useDispatch();
  const loginBtnClickHandler = () => {
    dispatch(openModal("login"));
  };
  const signupBtnClickHandler = () => {
    dispatch(openModal("register"));
  };
  const logoutBtnClickHandler = () => {
    dispatch(logoutThunk());
  };
  const user = useSelector((state) => state.auth.user);

  return (
    <header>
      <div className={css.logoWrapper}>
        <Link to="/" className={css.brand} aria-label="LearnLingo Home">
          <svg className={css.logo} width="28" height="28" viewBox="0 0 28 28">
            <use href="/sprite.svg#icon-icon" />
          </svg>
          <span className={css.logoText}>LearnLangUA</span>
        </Link>
      </div>
      <nav className={css.nav} aria-label="Primary">
        <ul className={css.menu}>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? `${css.link} ${css.active}` : css.link
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/teachers"
              className={({ isActive }) =>
                isActive ? `${css.link} ${css.active}` : css.link
              }
            >
              Teachers
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  isActive ? `${css.link} ${css.active}` : css.link
                }
              >
                Favorites
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      <div className={css.actions}>
        {user ? (
          <button
            type="button"
            className={css.signup}
            onClick={logoutBtnClickHandler}
          >
            Logout
          </button>
        ) : (
          <>
            <button
              type="button"
              className={css.login}
              onClick={loginBtnClickHandler}
            >
              <svg
                className={css.loginIcon}
                width="20"
                height="20"
                aria-hidden="true"
              >
                <use href="/sprite.svg#icon-log-in" />
              </svg>
              <span className={css.loginText}>Log in</span>
            </button>
            <button
              type="button"
              className={css.signup}
              onClick={signupBtnClickHandler}
            >
              Registration
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
