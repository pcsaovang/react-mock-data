import { FC, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export const Portal: FC<PropsWithChildren> = ({ children }) => {
  return createPortal(
    <div role="dialog" tabIndex={-1}>
      {children}
    </div>,
    document.body
  );
};
