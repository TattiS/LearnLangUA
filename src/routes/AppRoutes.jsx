import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import TeachersPage from "../pages/TeachersPage/TeachersPage";
import FavoritesPage from "../pages/FavoritesPage/FavoritesPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import Layout from "../components/Layout/Layout";
import PrivateRoute from "./PrivateRoute/";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
