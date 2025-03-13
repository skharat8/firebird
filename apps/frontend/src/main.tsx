import React from "react";
import ReactDOM from "react-dom/client";

import "@fontsource-variable/recursive/slnt.css";

import App from "./App";
import "./assets/global.css";

// Supports weights 300-900

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
