import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import Loader from "./components/Loader/Loader";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

export default function App() {
  const { isOpen, type } = useSelector((state) => state.auth.modal);

  return (
    <Provider store={store}>
      <BrowserRouter>
        {isOpen && type === "register" && <RegisterModal />}
        {isOpen && type === "login" && <LoginModal />}
        <Suspense fallback={<Loader />}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}
