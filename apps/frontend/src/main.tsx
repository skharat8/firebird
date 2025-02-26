import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./assets/global.css";
import "@fontsource-variable/recursive/slnt.css"; // Supports weights 300-900

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
