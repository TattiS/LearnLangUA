import { Suspense } from "react";
import { useSelector } from "react-redux";
import Loader from "./components/Loader/Loader";
import AppRoutes from "./routes/AppRoutes";
import RegisterModal from "./components/Auth/RegisterModal";
import LoginModal from "./components/Auth/LoginModal";
import "./App.module.css";

export default function App() {
  const { isOpen, type } = useSelector((state) => state.auth.modal);

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
