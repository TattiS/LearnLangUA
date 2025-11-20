import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import Loader from "./components/Loader/Loader";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

export default function App() {
  const isRegisterModalOpen = useSelector(
    (state) => state.auth.isRegisterModalOpen
  );
  const isLoginModalOpen = useSelector((state) => state.auth.isLoginModalOpen);

  return (
    <Provider store={store}>
      <BrowserRouter>
        {isRegisterModalOpen && <RegisterModal />}
        {isLoginModalOpen && <LoginModal />}
        <Suspense fallback={<Loader />}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}
