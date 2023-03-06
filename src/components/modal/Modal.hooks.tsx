import { ComponentProps, ComponentType } from "react";

export function withModal<T extends ComponentType<any>>(WrappedComponent: T) {
  const displayName = WrappedComponent.displayName || "Component";

  function WithModal(props: ComponentProps<T>) {
    console.log(`Rendered ${displayName}`);
    return <WrappedComponent {...props} />;
  }

  WithModal.displayName = `withModal(${displayName})`;

  return WithModal;
}
