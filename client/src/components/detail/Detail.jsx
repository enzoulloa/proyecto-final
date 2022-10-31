import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  getDetail,
  clearDetail,
  removeOwnership,
  mercadoPago
} from "../../redux/actions.js";
import Swal from "sweetalert2";
import "./detail.scss";
import Payment from "../Payment.jsx";
import Carousel from "./Carousel.jsx";

export default function Detail() {
  const { id, name, prodPrice } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = {
    id: 0,
    name: "admin",
    role: 4,
  };
  const ownership = useSelector((state) => state.ownershipDetail);
  let productId = useSelector((state) => state.productId);
  // const [newId, setNewId] = useState('');
  const localUser = JSON.parse(window.localStorage.getItem("UserLogin"));
  const [product, setProduct] = useState({
    // external_reference: "ABC",
    notification_url: `https://proyecto-final.up.railway.app/payment/paymentId/${id}`,
    items: [
      {
        title: name,
        unit_price: parseInt(prodPrice),
        quantity: 1,
      },
    ],
    back_urls: {
      success: `http://localhost:5173/user/${localUser.name}/propiedades/?ownershipId=${id}`,
      failure: `http://localhost:5173/${id}/estado_de_pago`,
      pending: `http://localhost:5173/user/${localUser.name}/propiedades/?ownershipId=${id}`,
    },
    auto_return: "approved",
  });

  useEffect(() => {
    productId = productId;
    // console.log(paymentId);
    // setNewId(productId);
  },[productId]);

  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(mercadoPago(product));
    // return setPayment();
  }, [dispatch]);

  // useEffect(() => {
  //   setNewId(null);
  // }, []);
  // console.log(newId, productId);

  const handleDelete = () => {
    const id = ownership.id;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete",
        cancelButtonText: "No, cancel",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(removeOwnership(id));
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Ownership deleted successfully",
            "success"
          );
          navigate("/home");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Action canceled successfully",
            "error"
          );
        }
      });
  };

  function convertir() {
    let num = ownership.price + "";
    var op = num.split("").reverse();
    var new1 = "";
    for (let i = 0; i < op.length; i++) {
      if (i % 3 == 0 && i != 0) new1 = "." + new1;
      new1 = op[i] + new1;
    }
    return new1;
  }

  const price = convertir();
  
  // useEffect(() => {
  //   if (paymentStatus === "approved") return alert("Pago acreditado!");
  //   if (paymentStatus === "failure") return alert("Pago fallido");
  //   // if(pending) return alert('Pago pendiente...');
  // }, [paymentStatus]);

  return (
    <div className="container">
      {ownership.id ? (
        <div className="inner">
          <h1 className="h1">{ownership.name}</h1>
          <h4 className="h4">Localidad:&nbsp;{ownership.location}</h4>
          <p className="p">Habitaciones:&nbsp;{ownership.rooms}</p>
          <p className="p">
            Cochera:&nbsp;{ownership.garage === true ? "Tiene" : "No tiene"}
          </p>
          <p className="p">Metros cuadrados:&nbsp;{ownership.m2}</p>
          <p className="p">Tipo de propiedad:&nbsp;{ownership.type}</p>
          <p className="p">Puntuacion:&nbsp;{ownership.rating}</p>
          <p className="p">Expensas:&nbsp;{ownership.expenses}</p>
          <p className="p">Vendedor:&nbsp;{ownership.seller}</p>
          <p className="p">Descripcion:&nbsp;{ownership.description}</p>
          <p className="p">Estado:&nbsp;{ownership.state}</p>
          <h3>Precio:&nbsp;${price}</h3>
          <p className="p">Plantas:&nbsp;{ownership.floors}</p>
          <h3>Comentarios:</h3>
          <div className="row-detail titulo-detail div-titulo-detail ">
            <h2 className="h1">{ownership.name}</h2>
            <h2>Precio:&nbsp;${price}</h2>
          </div>
          <div className="div-detail">
            <Carousel images={ownership.images} />
            {/*ownership.images?.map((imgSrc, index) => (
              <img src={imgSrc} key={index} alt={index + "img"} />
            ))*/}
          </div>
          <div className="div-detail">
            <h2>Descripcion</h2>
            <br />
            <p className="p">{ownership.description}</p>
          </div>
          <div className="div-detail">
            <h2>Caracteristicas</h2>
            <hr className="hr-detail" />
            <br />
            <div className="row-detail">
              <div className="caract-detail">
                <div className="row-detail div-prop-detail">
                  <h4>Precio:&nbsp;</h4>
                  <h4 className="price-detail">${price}</h4>
                </div>
                <div className="row-detail div-prop-detail">
                  <h4 className="h4">Localidad:&nbsp;</h4>
                  <h4>{ownership.location}</h4>
                </div>
                <div className="row-detail div-prop-detail">
                  <h4 className="p">Direccion:&nbsp;</h4>
                  <h4>{ownership.address}</h4>
                </div>
                <div className="row-detail div-prop-detail">
                  <h4 className="p">Metros cuadrados:&nbsp;</h4>
                  <h4>{ownership.m2}</h4>
                </div>
                <div className="row-detail div-prop-detail">
                  <h4 className="p">Tipo de propiedad:&nbsp;</h4>
                  <h4>{ownership.type}</h4>
                </div>
              </div>
              <div className="caract-detail">
                <div className="row-detail div-prop-detail">
                  <h4>Plantas:&nbsp;</h4>
                  <h4>{ownership.floors}</h4>
                </div>
                <div className="row-detail div-prop-detail">
                  <h4 className="h4">Habitaciones:&nbsp;</h4>
                  <h4>{ownership.rooms}</h4>
                </div>
                <div className="row-detail div-prop-detail">
                  <h4 className="p">Cochera:&nbsp;</h4>
                  <h4>{ownership.garage === true ? "Tiene" : "No tiene"}</h4>
                </div>
                <div className="row-detail div-prop-detail">
                  <h4 className="p">Expensas:&nbsp;</h4>
                  <h4>{ownership.expenses}</h4>
                </div>
                <div className="row-detail div-prop-detail">
                  <h4 className="p">Vendedor:&nbsp;</h4>
                  <h4>{ownership.seller}</h4>
                </div>
                <div className="row-detail div-prop-detail">
                  <h4 className="p">Estado:&nbsp;</h4>
                  <h4>{ownership.state}</h4>
                </div>
              </div>
            </div>
          </div>
          <Payment productId={productId} />
          <div className="div-detail">
            <h3>Comentarios:</h3>
            <br />
            {ownership.review?.map((rev, index) => (
              <p key={index}>{rev}</p>
            ))}
          </div>
          {/* {user.role >= 3 ? (
            <button onClick={handleDelete} className="bt">
              Remove ownership
            </button>
          ) : null} */}
        </div>
      ) : (
        <div className="loading">
          <img
            src="https://www.bel-pa.com.tr/wp-content/plugins/wp-multi-store-locator-pro/assets/img/loader.gif"
            alt="..loading"
          />
        </div>
      )}
    </div>
  );
}
