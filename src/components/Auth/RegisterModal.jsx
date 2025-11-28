import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import RegisterForm from "./RegisterForm/RegisterForm";
import { closeModal, openModal } from "../../redux/authSlice";

const RegisterModal = () => {
  const dispatch = useDispatch();
  const { isOpen, type } = useSelector((state) => state.auth.modal);

  if (!isOpen || type !== "register") return null;

  const handleClose = () => dispatch(closeModal());
  const handleOpenLogin = () => dispatch(openModal({ type: "login" }));

  return (
    <Modal onClose={handleClose}>
      <RegisterForm
        onSubmitSuccess={handleClose}
        onGoToLogin={handleOpenLogin}
      />
    </Modal>
  );
};

export default RegisterModal;
