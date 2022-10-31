import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { mercadoPagoId, mercadoPagoPayment } from "../redux/actions";
import './PaymentStatus.scss';

export default function PaymentStatus() {

    const dispatch = useDispatch();
    const { ownershipId } = useParams();
    console.log(ownershipId);
    let paymentId = useSelector(state => state.paymentId);
    let paymentStatus = useSelector(state => state.paymentStatus);

    useEffect(() => {
        if(paymentId) {
            console.log(paymentId);
            // dispatch(mercadoPagoPayment(paymentId));
        }
    }, [paymentId]);

    useEffect(() => {
        dispatch(mercadoPagoId(ownershipId));
    }, []);

    return (
        <div className="containerP">
            {
                paymentStatus && paymentStatus.status === 'approved' ?
                    (
                        <div className="sub-container">
                            <div className="text">
                                <h1>PAGO APROBADO</h1>
                                <h3>  Su pago ha sido aprobado. Nos contactaremos a la brevedad para seguir adelante con la operación, chequee su casilla de correo electrónico.
                                      Muchas gracias!</h3>
                            </div>
                            <div className="buttons">
                                <div className="button">
                                    <Link to='/listings'><button>Volver al listado</button></Link>
                                </div>
                                <div className="button">
                                    <Link to='/'><button>Página principal</button></Link>
                                </div>
                            </div>
                        </div>
                    ) :
                    ((paymentStatus && paymentStatus.status === 'in_process') ?
                        (
                            <div className="sub-container">
                                <div className="top-container">
                                    <div className="title-text">
                                        <h1>PAGO EN PROCESO...</h1>
                                    </div>
                                    <div className="result-img">
                                        <img src='https://www.aba.org.do/images/WhatsApp_Image_2021-01-27_at_23000_PM.jpeg'/>
                                    </div>
                                    <div className="bottom-text">
                                        <h3>  Su pago está siendo procesado, chequee su correo electrónico para corroborar su estado final. En caso de ser aprobado nos contactaremos a la brevedad para seguir adelante con la operación.
                                            Muchas gracias!</h3>
                                    </div>
                                </div>
                                <div className="buttons">
                                    <div className="button">
                                        <Link to='/listings'><button>Volver al listado</button></Link>
                                    </div>
                                    <div className="button">
                                        <Link to='/'><button>Página principal</button></Link>
                                    </div>
                                </div>
                            </div>
                        ) : 'Voce no ha traido nada manito...') 
            }
        </div>
    );
};