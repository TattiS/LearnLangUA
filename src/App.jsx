import { Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./components/Loader/Loader";
import AppRoutes from "./routes/AppRoutes";
import RegisterModal from "./components/Auth/RegisterModal";
import LoginModal from "./components/Auth/LoginModal";
import { fetchFiltersMeta } from "./redux/filtersMetaSlice";
import "./App.module.css";

export default function App() {
  const dispatch = useDispatch();
  const { isOpen, type } = useSelector((state) => state.auth.modal);
  useEffect(() => {
    dispatch(fetchFiltersMeta());
  }, [dispatch]);
  return (
    <>
      {isOpen && type === "register" && <RegisterModal />}
      {isOpen && type === "login" && <LoginModal />}
      <Suspense fallback={<Loader />}>
        <AppRoutes />
      </Suspense>
    </>
  );
}
