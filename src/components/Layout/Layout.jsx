import { Outlet } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import css from "./Layout.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "../../redux/authSlice.js";
import { onAuthStateChangedListener } from "../../firebase/authService.js";
import { normalizeUser } from "../../redux/normalizeUser.js";

const Layout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        dispatch(setUser(normalizeUser(user)));
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);
  return (
    <div className={css.layout}>
      <Header />
      <main className={css.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
