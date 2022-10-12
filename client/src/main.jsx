import React from "react";
import ReactDOM from "react-dom/client";
import store from "./redux/store.js";
import App from "./routes/App";
import "./index.css";4
import { Provider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
