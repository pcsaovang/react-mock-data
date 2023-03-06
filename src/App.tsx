import { FC } from "react";
import { ModalProvider } from "./components/modal";
import { Home } from "./components/pages/home";

const App: FC = () => {
  return (
    <ModalProvider>
      <Home />
    </ModalProvider>
  );
};

export default App;
