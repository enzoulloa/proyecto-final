import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSales, mercadoPagoId } from "../redux/actions";
import "./UserOwnership.scss";

export default function UserOwnerships() {
  const dispatch = useDispatch();
  const ownershipId = window.location.search.split("=")[1]
    ? window.location.search.split("=")[1].split("&")[0]
    : null;
  const userId = JSON.parse(window.localStorage.getItem("UserLogin")).id;
  const userSales = useSelector((state) => state.userSales);

  useEffect(() => {
    if (ownershipId) {
      dispatch(mercadoPagoId(ownershipId, userId));
    }
    dispatch(getSales(userId));
  }, [dispatch, ownershipId]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        marginTop: "20px",
      }}
    >
      <h2 style={{ color: "#f1f1f0", alignSelf: "center" }}>
        Listado de señas realizadas
      </h2>
      {userSales &&
        userSales.map((s, i) => {
          return (
            <div class="wrap-collabsible">
              <input id={`collapsible${i}`} class="toggle" type="checkbox" />
              <label for={`collapsible${i}`} class="lbl-toggle">
                {s.Ownerships[0].name}
              </label>
              <div class="collapsible-content">
                <div class="content-inner">
                  <p>
                    Id de pago: <b>{s.paymentId}</b>
                  </p>
                  <p>
                    Estado de la seña:{" "}
                    <b>{s.state === "approved" ? "Aprobado" : "En proceso"}</b>
                  </p>
                  <p>
                    Valor de la seña:{" "}
                    <b>${Math.round(s.Ownerships[0].price * 0.1, 2)}</b>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
