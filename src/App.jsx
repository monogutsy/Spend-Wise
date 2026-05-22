import { useEffect } from "react";
import { useSelector } from "react-redux";

import AppRoutes from "./routes/AppRoutes";
import { selectDarkMode } from "./features/settings/settingsSelectors";
import { useAuthListener } from "./hooks/useAuthListener";

function App() {
  const darkMode = useSelector(selectDarkMode);
  useAuthListener();

  useEffect(() => {
    document.body.classList.toggle(
      "dark-mode",
      darkMode
    );
  }, [darkMode]);

  return <AppRoutes />;
}

export default App;
