import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMercadopago } from "react-sdk-mercadopago";
import './payment.scss';

export default function Payment({ productId }) {
  console.log(productId);
  // let id = useSelector((state) => state.paymentId);
  const mp = useMercadopago.v2("TEST-4451a309-a6c0-4e53-8983-9e6f42531c98", {
    locale: "es-AR",
  });
  // function setPaymentId (paymentId) {
  //   return paymentId = null;
  // };
// let id2;

//   useEffect(()=> {
//     id = id;
//     console.log(id);
// }, [id])
  useEffect(() => {
    // console.log(id);
    // console.log(id2);
    // id2 = id;
    // console.log(id2);
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
    // return setPaymentId(paymentId);
    }, [mp, productId]);
  return (productId && <div className="cho-container"></div>);
}
