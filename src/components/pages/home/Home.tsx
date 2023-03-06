import { FC } from "react";
import { ModalId } from "../../../constants/modal";
import { Modal, useModal } from "../../modal";
import { TodoModal } from "./TodoModal";

export const Home: FC = () => {
  const { showModal } = useModal();

  return (
    <div>
      Home page
      <button onClick={() => showModal(ModalId.LOGIN_MODAL)}>
        Show modal 1
      </button>
      <button onClick={() => showModal(ModalId.TODO_LIST_MODAL)}>
        Show modal 2
      </button>
      <LoginModal />
      <TodoModal />
    </div>
  );
};

const LoginModal: FC = () => {
  return (
    <Modal title="Login" modalId="loginModal">
      <div>
        <label>Email</label>
        <input name="email" />
      </div>
      <div>
        <label>Password</label>
        <input name="password" />
      </div>
    </Modal>
  );
};
