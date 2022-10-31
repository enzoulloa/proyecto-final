import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mercadoPagoId } from "../redux/actions";

export default function PaymentStatus() {

    const dispatch = useDispatch();
    let paymentId = useSelector(state => state.paymentId);

    useEffect(() => {
        paymentId = paymentId;
    }, [paymentId]);

    useEffect(() => {
        dispatch(mercadoPagoId());
    }, []);

    return (
        <div>HOLA!</div>
    );
};