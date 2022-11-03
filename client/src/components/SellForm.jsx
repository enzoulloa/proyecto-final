import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { postProperty } from "../redux/actions";
import "./SellForm.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function SellForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const response = useSelector((state) => state.reponse);
  const error = useSelector((state) => {
    state.error;
  });
  const user = JSON.parse(localStorage.getItem("UserLogin"));
  const [imageSelected, setImageSelected] = useState("");

  async function uploadImage() {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "iu0b2lxj");
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dtbxaawjp/image/upload`,
      formData
    );
    setImageSelected(response.data.url);
  }

  return (
    <Formik
      initialValues={{
        name: "",
        type: "",
        location: "",
        rooms: 0,
        garage: "",
        m2: 0,
        expenses: 0,
        seller: user ? user.name : "Enzo",
        description: "",
        imageLink: "",
        images: [],
        state: "",
        price: 0,
        floors: 0,
        address: "",
        published: "Revision Pendiente",
        imageSelected: "",
      }}
      validationSchema={Yup.object({
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
          .integer("Se requiere un número válido")
          .positive("Se requiere un número mayor a 0"),
        floors: Yup.number()
          .required("Este campo debe ser completado")
          .typeError("Se requiere un número válido")
          .integer("Se requiere un número entero")
          .positive("Se requiere un número mayor a 0"),
        garage: Yup.boolean()
          .required("Este campo debe ser completado")
          .typeError("Elegir una opción"),
        m2: Yup.number()
          .required("Este campo debe ser completado")
          .typeError("Se requiere un número válido")
          .positive("Se requiere un número mayor a 0"),
        state: Yup.string().required("Este campo debe ser completado"),
        price: Yup.number()
          .required("Este campo debe ser completado")
          .typeError("Se requiere un número, sin puntos ni comas")
          .integer("Debe escribir el número solo, sin puntos ni comas")
          .positive("Se requiere un número mayor a 0"),
        expenses: Yup.number()
          .required("Este campo debe ser completado")
          .typeError("Se requiere un número, sin puntos ni comas")
          .integer("Se requiere un número entero")
          .positive("Se requiere un número mayor a 0")
          .max(99999999, "Se requiere un número menor a 8 dígitos"),
        description: Yup.string()
          .required("Este campo debe ser completado")
          .max(200, "La descripción no debe superar los 200 caracteres"),
        // images: Yup.string().url("Se debe introducir un link válido"),
        // images: Yup.array()
        //   .required("Este campo debe ser completado")
        //   .min(1, "Se requiere, como mínimo, una imagen")
        //   .max(3, "Solo debe adjuntar un máximo de 3 imágenes")
        //   .of(Yup.string().url("Este campo debe ser completado con urls")),
        // imageLink: Yup.string().url("Se requiere un link válido"),
      })}
      onSubmit={(values) => {
        values.garage === "true"
          ? (values.garage = true)
          : (values.garage = false);
        dispatch(postProperty({ ...values, images: [imageSelected] }));
        Swal.fire({
          icon: "success",
          title: "Formulario Enviado",
          text: "En breve recibiras un correo electronico con la informacion del mismo.",
        });
        navigate("/listado");
      }}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        setFieldValue,
      }) => (
        <div className="FormContainer">
          <Form className="Form">
            <div className="FieldsContainer">
              <div className="FieldContainer">
                <label id="label" htmlFor="name">
                  Titulo de la publicacion
                </label>
                <Field name="name" className="inputForm" />
                {touched.name && errors.name ? (
                  <div className="errorForm">{errors.name}</div>
                ) : null}
              </div>
              <div className="FieldContainer">
                <label id="label" htmlFor="type">
                  Tipo de propiedad{" "}
                </label>
                <Field name="type" className="inputForm" />
                {touched.type && errors.type ? (
                  <div className="errorForm">{errors.type}</div>
                ) : null}
              </div>
              <div className="FieldContainer">
                <label id="label" htmlFor="location">
                  Localidad{" "}
                </label>
                <Field name="location" className="inputForm" />
                {touched.location && errors.location ? (
                  <div className="errorForm">{errors.location}</div>
                ) : null}
              </div>
              <div className="FieldContainer">
                <label id="label" htmlFor="address">
                  Dirección{" "}
                </label>
                <Field name="address" className="inputForm" />
                {touched.address && errors.address ? (
                  <div className="errorForm">{errors.address}</div>
                ) : null}
              </div>
              <div className="FieldContainer">
                <label id="label" htmlFor="rooms">
                  Número de habitaciones{" "}
                </label>
                <Field
                  name="rooms"
                  type="number"
                  min="0"
                  className="inputForm"
                />
                {touched.rooms && errors.rooms ? (
                  <div className="errorForm">{errors.rooms}</div>
                ) : null}
              </div>
              <div className="FieldContainer">
                <label id="label" htmlFor="floors">
                  Pisos{" "}
                </label>
                <Field
                  name="floors"
                  type="number"
                  min="0"
                  className="inputForm"
                />
                {touched.floors && errors.floors ? (
                  <div className="errorForm">{errors.floors}</div>
                ) : null}
              </div>
              <div className="FieldContainer">
                <label id="label" htmlFor="garage">
                  Cochera
                </label>
                <Field name="garage" as="select" className="inputForm">
                  <option>Seleccionar</option>
                  <option value={false}>No</option>
                  <option value={true}>Si</option>
                </Field>
                {touched.garage && errors.garage ? (
                  <div className="errorForm">{errors.garage}</div>
                ) : null}
              </div>
              <div className="FieldContainer">
                <label id="label" htmlFor="m2">
                  Tamaño (m2){" "}
                </label>
                <Field name="m2" type="number" min="0" className="inputForm" />
                {touched.m2 && errors.m2 ? (
                  <div className="errorForm">{errors.m2}</div>
                ) : null}
              </div>
              <div className="FieldContainer">
                <label id="label" htmlFor="state">
                  Estado{" "}
                </label>
                <Field name="state" as="select" className="inputForm">
                  <option>Seleccionar</option>
                  <option value="Venta">En venta</option>
                  <option value="Alquiler">En alquiler</option>
                </Field>
                {touched.state && errors.state ? (
                  <div className="errorForm">{errors.state}</div>
                ) : null}
              </div>
              <div className="FieldContainer">
                <label id="label" htmlFor="price">
                  Precio ($){" "}
                </label>
                <Field
                  name="price"
                  type="number"
                  min="0"
                  className="inputForm"
                />
                {touched.price && errors.price ? (
                  <div className="errorForm">{errors.price}</div>
                ) : null}
              </div>
              <div className="FieldContainer">
                <label id="label" htmlFor="expenses">
                  Expensas ($){" "}
                </label>
                <Field
                  name="expenses"
                  type="number"
                  min="0"
                  className="inputForm"
                />
                {touched.expenses && errors.expenses ? (
                  <div className="errorForm">{errors.expenses}</div>
                ) : null}
              </div>
              <div className="FieldContainer">
                <label id="label" htmlFor="description">
                  Descripción{" "}
                </label>
                <Field name="description" className="inputForm" />
                {touched.description && errors.description ? (
                  <div className="errorForm">{errors.description}</div>
                ) : null}
              </div>
              <div className="FieldContainer">
                <label id="label" htmlFor="images">
                  Imágenes (url){" "}
                </label>
                <FieldArray
                  className="FieldContainer"
                  name="images"
                  render={(arrayHelpers) => (
                    <div>
                      <div className="ImageField">
                        <input
                          name="imageLink"
                          id="imageLink"
                          type="file"
                          className="inputFormFiles"
                          onChange={(e) => setImageSelected(e.target.files[0])}
                          accept="image/*"
                        />
                        <div>
                          <button
                            type="button"
                            className="addButton"
                            onClick={(e) => {
                              uploadImage();
                              setFieldValue("imageLink", "");
                            }}
                          >
                            Añadir
                          </button>
                        </div>
                      </div>
                      {imageSelected !== "" &&
                      typeof imageSelected !== "object" ? (
                        <div className="ImagePeview">
                          <img
                            width="200px"
                            src={imageSelected}
                            alt="uploadedImg"
                          />
                        </div>
                      ) : null}

                      {values.images.length === 0 ? (
                        <div className="errorForm">{errors.images}</div>
                      ) : null}
                      {values.images.length === 3 ? (
                        <div className="warningForm">
                          Advertencia: No se pueden adjuntar más de 3 imágenes
                        </div>
                      ) : null}
                      {/* {values.images.length > 0 ? (
                        <div className="ImagePeview">
                          <div key={index} className="eachImage">
                            <img width="100px" src={imageSelected} />
                            <div className="deleteButtonContainer">
                              <button
                                type="button"
                                className="deleteButton"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                x
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : null} */}
                    </div>
                  )}
                />
              </div>
            </div>
            <div>
              <button className="FormButton" type="submit">
                Enviar
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
    // </div>
  );
  //   );
}
