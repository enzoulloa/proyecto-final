import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getSales, mercadoPagoId } from "../redux/actions";
import { Table } from 'antd';
import './PaymentStatus.scss';
import { columnSales } from "./UserDetails/common";

export default function UserOwnerships() {

    const dispatch = useDispatch();
    // window.location.search()
    const ownershipId = window.location.search.split('=')[1] ? window.location.search.split('=')[1].split('&')[0] : null;
    console.log(ownershipId);
    // const idUser = window.location.search.split('=')[3];
    // console.log(idUser);
    const userId = JSON.parse(window.localStorage.getItem('UserLogin')).id;
    console.log(userId);
    // const userId = useParams();
    // let paymentId = useSelector(state => state.paymentId);
    const userSales = useSelector(state => state.userSales);
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
        if(ownershipId){
            dispatch(mercadoPagoId(ownershipId, userId));
        };
    }, [ownershipId]);

    useEffect(() => {
        console.log('entro al efecto');
        // dispatch(getUserId(idUser));
        // dispatch(mercadoPagoId(ownershipId));
        dispatch(getSales(userId));
    }, [ownershipId, userId]);

    return (
        <div>
            <Table dataSource={userSales} columns={columnSales}/>
        </div>
    );
        // <div className="containerP">
            {/* {
                userSales && (userSales.length ? userSales.map(sale => (
                    <div key={sale.id}>
                        <h1>{sale.Ownerships.length ? sale.Ownerships[0].name : 'NO TIENE PROPIEDAD'}</h1>
                        <h3>{sale.state}</h3>
                        <h3>{sale.state_detail}</h3>
                    </div>
                )): <div>Espere...</div>)
            }
            {
                !userSales && 
                    <div>
                        <h1>NO TENES VENTAS PAPITO</h1>
                    </div>
            } */}
            {/* {
                paymentStatus && paymentStatus.status === 'approved' ?
                    (
                        <div className="sub-container">
                            <div className="top-container">
                                <div className="title-text">
                                    <h1>PAGO APROBADO</h1>
                                </div>
                                <div className="result-img">
                                    <img src='https://fece.org/wp-content/uploads/2017/12/bigstock-204968347.jpg' alt="PAGO APROBADO!"/>
                                </div>
                                <div className="bottom-text">
                                    <h3>  Su pago ha sido aprobado. Nos contactaremos a la brevedad para seguir adelante con la operación, chequee su casilla de correo electrónico.
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
                    ) :
                    ((paymentStatus && paymentStatus.status === 'in_process') ?
                        (
                            <div className="sub-container">
                                <div className="top-container">
                                    <div className="title-text">
                                        <h1>PAGO EN PROCESO...</h1>
                                    </div>
                                    <div className="result-img">
                                        <img src='https://www.aba.org.do/images/WhatsApp_Image_2021-01-27_at_23000_PM.jpeg'
                                            alt="PAGO EN PROCESO..."/>
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
            } */}
        // </div>
    ;
};