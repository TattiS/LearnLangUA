import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import LoginForm from "./LoginForm";
import { closeModal, openModal } from "../../redux/authSlice";

const LoginModal = () => {
  const dispatch = useDispatch();
  const { isOpen, type } = useSelector((state) => state.auth.modal);

  if (!isOpen || type !== "login") return null;

  const handleClose = () => dispatch(closeModal());
  const handleOpenRegister = () => dispatch(openModal({ type: "register" }));

  return (
    <Modal onClose={handleClose}>
      <LoginForm
        onSubmitSuccess={handleClose}
        onGoToRegister={handleOpenRegister}
      />
    </Modal>
  );
};

export default LoginModal;
