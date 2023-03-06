import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { ModalId } from "../../constants/modal";

export type ModalContext = {
  show?: string;
  showModal: (modalId: ModalId) => void;
  hideModal: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ModalContext = createContext<ModalContext>({
  show: undefined,
  showModal: () => {},
  hideModal: () => {},
});

export const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [show, setShow] = useState<string>();

  const handleShow = useCallback((modalId: ModalId) => {
    setShow(modalId);
  }, []);

  const handleHide = useCallback(() => {
    setShow(undefined);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        show,
        showModal: handleShow,
        hideModal: handleHide,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
