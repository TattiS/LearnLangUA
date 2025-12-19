import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { openModal } from "../redux/authSlice.js";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => Boolean(state.auth?.user));
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(openModal("login"));
    }
  }, [isAuthenticated, dispatch]);
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PrivateRoute;
