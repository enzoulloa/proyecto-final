import React from "react";
import "../scss/loading.scss";
import gif3 from "../assets/loading3.gif";

export default function Loading() {
  return (
    <div className="loading">
      <img
        src={`https://images-ext-2.discordapp.net/external/m51niX8M-0VVIFz_Db7Iw8xdKGrGCwuoRFkbgYIsou0/https/www.bel-pa.com.tr/wp-content/plugins/wp-multi-store-locator-pro/assets/img/loader.gif`}
        alt="Loading"
      />
      <div className="loading-label">Cargando...</div>
    </div>
  );
}
