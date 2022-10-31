import React from "react";
import ReactDOM from "react-dom/client";
import store from "./redux/store.js";
import App from "./routes/App";
import "./index.css";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import "antd/dist/antd.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Auth0Provider
      domain="agusbez.us.auth0.com"
      clientId="33Wrc4cmG64fheBxmJJr40dyW1RlVpTH"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </Provider>
);
