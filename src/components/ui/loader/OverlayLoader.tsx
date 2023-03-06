import { FC } from "react";
import styled from "styled-components";
import { Spinner } from "../spinner";

type Props = {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
};

export const OverlayLoader: FC<Props> = ({ size, showText }) => {
  return (
    <Container>
      <SpinnerWrapper>
        <Spinner size={size} />
        {showText && <span>Loading...</span>}
      </SpinnerWrapper>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: auto;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: #000;
`;
