import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMercadopago } from "react-sdk-mercadopago";
import "./payment.scss";
import Swal from "sweetalert2";
import ModalPortal from "./Modal/Modal";
import ModalUser from "./LoginModal/ModalUser";

export default function Payment({ productId }) {
  const [showModal, setShowModal] = useState(false);
  const mp = useMercadopago.v2("TEST-4451a309-a6c0-4e53-8983-9e6f42531c98", {
    locale: "es-AR",
  });
  console.log(productId);
  const user = JSON.parse(window.localStorage.getItem("UserLogin"));

  function handleClick() {
    if (!user) return setShowModal(true);
  }

  function handleClose() {
    setShowModal(false);
  }

  useEffect(() => {
    if (mp && productId) {
      try {
        mp.checkout({
          preference: {
            id: productId,
          },
          render: {
            container: ".cho-container",
            label: "Señar",
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [mp, productId]);

  return (
    <div>
      {user ? (
        productId && <div className="cho-container"></div>
      ) : (
        <button onClick={() => handleClick()}>Señar</button>
      )}
      {showModal && (
        <ModalPortal onClose={() => handleClose()}>
          <ModalUser />
        </ModalPortal>
      )}
    </div>
  );
}
