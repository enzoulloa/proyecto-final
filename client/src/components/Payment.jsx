import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMercadopago } from "react-sdk-mercadopago";
import './payment.scss';

export default function Payment({ paymentId }) {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.paymentId);
  const mp = useMercadopago.v2("TEST-4451a309-a6c0-4e53-8983-9e6f42531c98", {
    locale: "es-AR",
  });

//   useEffect(()=> {
// }, [])
useEffect(() => {
    //   dispatch(mercadoPago(product));
    console.log(paymentId)
    if (mp) {
      mp.checkout({
        preference: {
          id: paymentId,
        },
        render: {
          container: ".cho-container",
          label: "Comprar",
        },
      });
    }
  }, [mp]);

  return (paymentId ? <div className="cho-container"></div> : null);
}