import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMercadopago } from "react-sdk-mercadopago";
import "./payment.scss";
import Swal from "sweetalert2";
import Modal from "./Modal/Modal";
import SignIn from "./Login/SignIn/SignIn";


export default function Payment({ productId }) {
  console.log(productId);
  const [showModal, setShowModal] = useState(false);
  const mp = useMercadopago.v2("TEST-4451a309-a6c0-4e53-8983-9e6f42531c98", {
    locale: "es-AR",
  });

  const user = JSON.parse(window.localStorage.getItem("UserLogin"));

  function handleClick() {
    if (!user) return setShowModal(true)
  }

  function handleClose() {
    setShowModal(false)
  }

  useEffect(() => {
    if (mp && productId) {
      mp.checkout({
        preference: {
          id: productId,
        },
        render: {
          container: ".cho-container",
          label: "Comprar",
        },
      });
    }
  }, [mp, productId]);

  return (
    <div>
      {user ? (
        productId && <div className="cho-container"></div>
      ) : (
        <button onClick={() => handleClick()}>Comprar</button>
      )}
      {showModal && <Modal onClose={()=>handleClose()}><SignIn/></Modal>}
    </div>
  );
}
