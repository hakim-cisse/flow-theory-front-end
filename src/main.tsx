import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import { ThemeProvider } from "./components/ThemeProvider";

// Pre-paint theme application to avoid flash of incorrect theme
(function () {
  try {
    const stored = localStorage.getItem("fta-theme");
    const sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored === "dark" || ((stored === null || stored === "system") && sysDark);
    if (isDark) document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  } catch {}
})();

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
