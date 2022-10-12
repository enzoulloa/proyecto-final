import React from "react";
import ReactDOM from "react-dom/client";
import store from "./redux/store.js";
import App from "./routes/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
