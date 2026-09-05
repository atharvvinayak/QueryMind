import {
  Routes,
  Route,
} from "react-router-dom";

import Landing from "./pages/Landing";
import Workspace from "./pages/Workspace";

import ThemeToggle from "./components/ThemeToggle";
import LanguageSelector from "./components/LanguageSelector";

export default function App() {
  return (
    <>
      <ThemeToggle />

      <LanguageSelector />

      <Routes>
        <Route
          path="/"
          element={<Landing />}
        />

        <Route
          path="/workspace"
          element={<Workspace />}
        />
      </Routes>
    </>
  );
}