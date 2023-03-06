import { FC, PropsWithChildren, ReactElement, useEffect } from "react";
import styled from "styled-components";
import { ModalId } from "../../constants/modal";
import { Portal } from "../portal/Portal";
import { OverlayLoader } from "../ui/loader";
import { CloseButton } from "./CloseButton";
import { useModal } from "./Context";

type Props = {
  title: string | ReactElement;
  modalId: ModalId;
  contentLoading?: boolean;
};

export const Modal: FC<PropsWithChildren<Props>> = ({
  title,
  modalId,
  contentLoading,
  children,
}) => {
  const { show, hideModal } = useModal();

  console.log(show)

  useEffect(() => {
    if (show !== modalId) {
      return;
    }

    document.body.classList.add("is-modal");

    return () => {
      document.body.classList.remove("is-modal");
    };
  }, [modalId, show]);

  if (show !== modalId) {
    return null;
  }

  return (
    <Portal>
      <OverLay tabIndex={-1} onClick={hideModal} />
      <Inner>
        <Header>
          <Title>{title}</Title>
          <CloseButton onClick={hideModal} />
        </Header>

        <Content isScroll={!contentLoading}>
          {contentLoading && <OverlayLoader showText />}
          {children}
        </Content>
        <Footer>Footer</Footer>
      </Inner>
    </Portal>
  );
};

const OverLay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Inner = styled.div`
  width: 600px;
  background-color: rgb(255, 255, 255);
  background-clip: padding-box;
  z-index: 2;
  display: block;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
  outline: none;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding: 10px 20px;
`;

const Content = styled.div<{ isScroll: boolean }>`
  padding: 10px 20px;
  min-height: 200px;
  max-height: calc(100vh - 300px);
  overflow-y: ${({ isScroll }) => (isScroll ? "auto" : "hidden")};
  position: relative;
`;

const Footer = styled.div`
  border-top: 1px solid #eee;
  padding: 10px 20px;
`;

const Title = styled.div`
  font-weight: bold;
`;
