import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { openModal } from "../redux/authSlice.js";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => Boolean(state.auth?.user));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(openModal("login"));
    }
  }, [isAuthenticated, dispatch]);
  if (!isAuthenticated) {
    return null;
  }
  return children;
};

export default PrivateRoute;
