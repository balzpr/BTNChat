import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import {BrowserRouter} from "react-router-dom";
if (Notification.permission === "default") {
  Notification.requestPermission()
    .then((permission) => {
      if (permission !== "granted") {
        console.log("Notifications permission denied");
      }
    })
    .catch((err) => console.error("Notification permission error:", err));
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
