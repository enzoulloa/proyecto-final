import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, FieldArray, useFormik } from "formik";
import * as Yup from "yup";
import { postProperty } from "../redux/actions";
import "./SellForm.scss";
import { useNavigate } from "react-router-dom";

export default function SellForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const response = useSelector((state) => state.reponse);
  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      location: "",
      rooms: 0,
      garage: false,
      m2: 0,
      rating: null,
      expenses: 0,
      seller: "Enzo",
      description: "",
      images: "",
      state: "",
      price: 0,
      floors: 0,
      reviews: [],
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Este campo debe ser completado")
        .matches(/^[a-z ,.'-]+$/i, "Se requiere un nombre válido"),
      type: Yup.string()
        .required("Este campo debe ser completado")
        .matches(/^[a-zA-Z]+$/i, "Se requiere un tipo de propiedad válido"),
      location: Yup.string()
        .required("Este campo debe ser completado")
        .matches(/^[a-z ,.'-]+$/i, "Se requiere una localidad válida"),
      address: Yup.string()
        .required("Este campo debe ser completado")
        .matches(/^[A-Za-z-0-99999999]/, "Se requiere una dirección válida"),
      rooms: Yup.number()
        .required("Este campo debe ser completado")
        .typeError("Se requiere un número")
        .integer("Se requiere un número válido"),
      floors: Yup.number()
        .required("Este campo debe ser completado")
        .typeError("Se requiere un número válido")
        .integer("Se requiere un número entero"),
      garage: Yup.boolean().required("Este campo debe ser completado"),
      m2: Yup.number()
        .required("Este campo debe ser completado")
        .typeError("Se requiere un número válido"),
      state: Yup.string().required("Este campo debe ser completado"),
      price: Yup.number()
        .required("Este campo debe ser completado")
        .typeError("Se requiere un número, sin puntos ni comas")
        .integer("Debe escribir el número solo, sin puntos ni comas"),
      expenses: Yup.number()
        .required("Este campo debe ser completado")
        .typeError("Se requiere un número, sin puntos ni comas")
        .integer("Se requiere un número entero")
        .max(99999999, "Se requiere un número menor a 8 dígitos"),
      description: Yup.string()
        .required("Este campo debe ser completado")
        .max(200, "La descripción no debe superar los 200 caracteres"),
      images: Yup.string().url("Se debe introducir un link válido"),
      // images: Yup.array()
      //     .required('Este campo debe ser completado')
      //     .of(Yup.string()
      //         .url('Este campo debe ser completado con urls'))
      //     .max(3, 'Solo debe adjuntar un máximo de 3 imágenes')
    }),
    onSubmit: (values) => {
      if (values.garage === "true") {
        values.garage = true;
      } else {
        values.garage = false;
      }
      dispatch(postProperty({ ...values, images: [values.images] }));
      alert("Creado con exito");
      navigate("/listings");
    },
  });

  return (
    <div className="FormContainer">
      <form className="Form" onSubmit={formik.handleSubmit}>
        <div className="FieldContainer">
          <label id="label" htmlFor="name">
            Titulo de la publicacion
          </label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="inputForm"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="errorForm">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="FieldContainer">
          <label id="label" htmlFor="type">
            Tipo de propiedad{" "}
          </label>
          <input
            id="type"
            name="type"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.type}
            className="inputForm"
          />
          {formik.touched.type && formik.errors.type ? (
            <div className="errorForm">{formik.errors.type}</div>
          ) : null}
        </div>
        <div className="FieldContainer">
          <label id="label" htmlFor="location">
            Localidad{" "}
          </label>
          <input
            id="location"
            name="location"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.location}
            className="inputForm"
          />
          {formik.touched.location && formik.errors.location ? (
            <div className="errorForm">{formik.errors.location}</div>
          ) : null}
        </div>
        <div className="FieldContainer">
          <label id="label" htmlFor="address">
            Dirección{" "}
          </label>
          <input
            id="address"
            name="address"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            className="inputForm"
          />
          {formik.touched.address && formik.errors.address ? (
            <div className="errorForm">{formik.errors.address}</div>
          ) : null}
        </div>
        <div className="FieldContainer">
          <label id="label" htmlFor="rooms">
            Número de habitaciones{" "}
          </label>
          <input
            id="rooms"
            name="rooms"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rooms}
            className="inputForm"
          />
          {formik.touched.rooms && formik.errors.rooms ? (
            <div className="errorForm">{formik.errors.rooms}</div>
          ) : null}
        </div>
        <div className="FieldContainer">
          <label id="label" htmlFor="floors">
            Pisos{" "}
          </label>
          <input
            id="floors"
            name="floors"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.floors}
            className="inputForm"
          />
          {formik.touched.floors && formik.errors.floors ? (
            <div className="errorForm">{formik.errors.floors}</div>
          ) : null}
        </div>
        <div className="FieldContainer">
          <label id="label" htmlFor="garage">
            Cochera
          </label>
          <select
            id="garage"
            name="garage"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.garage}
            className="inputForm"
          >
            <option value={true}>Si</option>
            <option value={false}>No</option>
          </select>
          {formik.touched.garage && formik.errors.garage ? (
            <div className="errorForm">{formik.errors.garage}</div>
          ) : null}
        </div>
        <div className="FieldContainer">
          <label id="label" htmlFor="m2">
            Tamaño (m2){" "}
          </label>
          <input
            id="m2"
            name="m2"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.m2}
            className="inputForm"
          />
          {formik.touched.m2 && formik.errors.m2 ? (
            <div className="errorForm">{formik.errors.m2}</div>
          ) : null}
        </div>
        <div className="FieldContainer">
          <label id="label" htmlFor="state">
            Estado{" "}
          </label>
          <select
            id="state"
            name="state"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.state}
            className="inputForm"
          >
            <option value="for sale">En venta</option>
            <option value="for rent">En alquiler</option>
          </select>
          {formik.touched.state && formik.errors.state ? (
            <div className="errorForm">{formik.errors.state}</div>
          ) : null}
        </div>
        <div className="FieldContainer">
          <label id="label" htmlFor="price">
            Precio ($){" "}
          </label>
          <input
            id="price"
            name="price"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
            className="inputForm"
          />
          {formik.touched.price && formik.errors.price ? (
            <div className="errorForm">{formik.errors.price}</div>
          ) : null}
        </div>
        <div className="FieldContainer">
          <label id="label" htmlFor="expenses">
            Expensas ($){" "}
          </label>
          <input
            id="expenses"
            name="expenses"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.expenses}
            className="inputForm"
          />
          {formik.touched.expenses && formik.errors.expenses ? (
            <div className="errorForm">{formik.errors.expenses}</div>
          ) : null}
        </div>
        <div className="FieldContainer">
          <label id="label" htmlFor="description">
            Descripción{" "}
          </label>
          <input
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className="inputForm"
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="errorForm">{formik.errors.description}</div>
          ) : null}
        </div>
        <div className="FieldContainer">
          <label id="label" htmlFor="images">
            Imágenes{" "}
          </label>
          <input
            id="images"
            name="images"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.images}
            className="inputForm"
          />
          {formik.touched.images && formik.errors.images ? (
            <div className="errorForm">{formik.errors.images}</div>
          ) : null}
          {/* <button type="button" onClick={e => handleClick(e)}>+</button> */}
        </div>
        <div>
          <button className="FormButton" type="submit">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
