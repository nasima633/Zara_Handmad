import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ShopProvider } from "./context/ShopContext";
import "./styles/style.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ShopProvider>
      <App />
    </ShopProvider>
  </StrictMode>
);
