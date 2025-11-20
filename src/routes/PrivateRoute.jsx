import { useSelector, useDispatch } from "react-redux";
import { showLoginModal } from "../redux/auth/authSlice";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  if (!isAuthenticated) {
    dispatch(showLoginModal(true));
    return null;
  }
  return children;
};

export default PrivateRoute;
