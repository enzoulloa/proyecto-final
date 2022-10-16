import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDetail,
  clearDetail,
  removeOwnership,
} from "../../redux/actions.js";
import Swal from "sweetalert2";
import "./detail.scss";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = {
    id: 0,
    name: "admin",
    role: 4,
  };

  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  const ownership = useSelector((state) => state.Details);

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
          <h3>
            Comentarios:
            <br />
            {ownership.review?.map((rev, index) => (
              <p key={index}>{rev}</p>
            ))}
          </h3>
          <p className="p">Direccion:&nbsp;{ownership.address}</p>
          <h5 className="images">
            Imagenes:&nbsp;
            <br />
            {ownership.images?.map((imgSrc, index) => (
              <img src={imgSrc} key={index} alt={index + "img"} />
            ))}
          </h5>
          {user.role >= 3 ? (
            <button onClick={handleDelete} className="bt">
              Remove ownership
            </button>
          ) : null}
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
