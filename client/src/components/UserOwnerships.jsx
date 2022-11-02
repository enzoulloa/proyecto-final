import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSales, mercadoPagoId } from "../redux/actions";
import { Table } from "antd";
import "./PaymentStatus.scss";
import { columnSales } from "./UserDetails/common";

//---------------------------------------------------------
//Ver si lo renderizamos aca, o como cards en /informacion
//---------------------------------------------------------

export default function UserOwnerships() {
  const dispatch = useDispatch();
  // window.location.search()
  const ownershipId = window.location.search.split("=")[1]
    ? window.location.search.split("=")[1].split("&")[0]
    : null;
  console.log(ownershipId);
  // const idUser = window.location.search.split('=')[3];
  // console.log(idUser);
  const userId = JSON.parse(window.localStorage.getItem("UserLogin")).id;
  console.log(userId);
  // const userId = useParams();
  // let paymentId = useSelector(state => state.paymentId);
  const userSales = useSelector((state) => state.userSales);
  console.log(userSales);
  // let paymentStatus = useSelector(state => state.paymentStatus);
  // let paymentStatus = {
  //     status: 'approved'
  // };

  // useEffect(() => {
  //     if(paymentId) {
  //         console.log(paymentId);
  //         dispatch(mercadoPagoPayment(paymentId));
  //     }
  // }, [paymentId]);

  useEffect(() => {
    if (ownershipId) {
      dispatch(mercadoPagoId(ownershipId, userId));
    }
    dispatch(getSales(userId));
  }, [dispatch, ownershipId]);

  // useEffect(() => {
  //     // console.log('entro al efecto');
  //     // dispatch(getUserId(idUser));
  //     // dispatch(mercadoPagoId(ownershipId));
  //     dispatch(getSales(userId));
  // }, [dispatch]);

  return (
    <div>
      {/* {
                userSales.length && userSales.map(sale => (
                    <div>
                        <div>{}</div>
                        <Cards 
                            images={}
                            name={}
                            location={}
                            price={}
                            rooms={}
                            type={}
                            id={}
                        />
                    </div>
                ))
            } */}
      <Table dataSource={userSales} columns={columnSales} />
    </div>
  );
}
