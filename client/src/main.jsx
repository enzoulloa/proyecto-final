import React from "react";
import ReactDOM from "react-dom/client";
import store from "./redux/store.js";
import App from "./routes/App";
import "./index.css";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Auth0Provider
      dommain="agusbez.us.auth0.com"
      clientId="Pf8T9z545bIjkNoFrKYWjQhR1U4tniz1"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </Provider>
);
