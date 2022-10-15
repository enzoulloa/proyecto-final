import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Field, FieldArray, useFormik } from 'formik';
import * as Yup from 'yup';
import { postProperty } from "../redux/actions";
import './SellForm.scss';

export default function SellForm () {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            name: '',
            type: '',
            location: '',
            rooms: '',
            garage: false,
            m2: '',
            rating: '',
            expenses: '',
            seller: '',
            description: '',
            images: '',
            state: '',
            price: '',
            floors: '',
            reviews: [],
            address: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Este campo debe ser completado')
                .matches(/^[a-z ,.'-]+$/i, 'Se requiere un nombre válido'),
            type: Yup.string()
                .required('Este campo debe ser completado')
                .matches(/^[a-zA-Z]+$/i, 'Se requiere un tipo de propiedad válido'),
            location: Yup.string()
                .required('Este campo debe ser completado')
                .matches(/^[a-z ,.'-]+$/i, 'Se requiere una localidad válida'),
            address: Yup.string()
                .required('Este campo debe ser completado')
                .matches(/^[A-Za-z-0-99999999]/, 'Se requiere una dirección válida'),
            rooms: Yup.number()
                .required('Este campo debe ser completado')
                .typeError('Se requiere un número')
                .integer('Se requiere un número válido'),
            floors: Yup.number()
                .required('Este campo debe ser completado')
                .typeError('Se requiere un número válido')
                .integer('Se requiere un número entero'),
            garage: Yup.boolean()
                .required('Este campo debe ser completado'),
            m2: Yup.number()
                .required('Este campo debe ser completado')
                .typeError('Se requiere un número válido'),
            state: Yup.string()
                .required('Este campo debe ser completado'),
            price: Yup.number()
                .required('Este campo debe ser completado')
                .typeError('Se requiere un número, sin puntos ni comas')
                .integer('Debe escribir el número solo, sin puntos ni comas'),
            expenses: Yup.number()
                .required('Este campo debe ser completado')
                .typeError('Se requiere un número, sin puntos ni comas')
                .integer('Se requiere un número entero')
                .max(99999999, 'Se requiere un número menor a 8 dígitos'),
            description: Yup.string()
                .required('Este campo debe ser completado')
                .max(200, 'La descripción no debe superar los 200 caracteres'),
            images: Yup.string()
                .url('Se debe introducir un link válido')
            // images: Yup.array()
            //     .required('Este campo debe ser completado')
            //     .of(Yup.string()
            //         .url('Este campo debe ser completado con urls'))
            //     .max(3, 'Solo debe adjuntar un máximo de 3 imágenes')
        }),
        onSubmit: values => {
            // alert('aaa')
            console.log({...values, images: [values.images]});
            dispatch(postProperty({...values, images: [values.images]}));
        },
    });
    
    function handleClick (e) {
        // const images = document.getElementById('images');
        // formik.values.images.push('asdaa');
        console.log(e.target.value);
    };

    return (
        <div className="FormContainer">
            <form className="Form" onSubmit={formik.handleSubmit}>
                <div className="FieldContainer">
                    <label id="label" htmlFor="name">Nombre completo </label>
                    <input id='name' name='name' type='text' onChange={formik.handleChange}
                        onBlur={formik.handleBlur} value={formik.values.name}/>
                    {
                        formik.touched.name && formik.errors.name ?
                        (<div className="error">{formik.errors.name}</div>) : null
                    }
                </div>
                <div className="FieldContainer">
                    <label id="label" htmlFor="type">Tipo de propiedad </label>
                    <input id='type' name='type' type='text' onChange={formik.handleChange}
                        onBlur={formik.handleBlur} value={formik.values.type}/>
                    {
                        formik.touched.type && formik.errors.type ?
                        (<div className="error">{formik.errors.type}</div>) : null
                    }
                </div>
                <div className="FieldContainer">
                    <label id="label" htmlFor="location">Localidad </label>
                    <input id='location' name='location' type='text' onChange={formik.handleChange}
                        onBlur={formik.handleBlur} value={formik.values.location}/>
                    {
                        formik.touched.location && formik.errors.location ?
                        (<div className="error">{formik.errors.location}</div>) : null
                    }
                </div>
                <div className="FieldContainer">
                    <label id="label" htmlFor="address">Dirección </label>
                    <input id='address' name='address' type='text' onChange={formik.handleChange}
                        onBlur={formik.handleBlur} value={formik.values.address}/>
                    {
                        formik.touched.address && formik.errors.address ?
                        (<div className="error">{formik.errors.address}</div>) : null
                    }
                </div>
                <div className="FieldContainer">
                    <label id="label" htmlFor="rooms">Número de habitaciones </label>
                    <input id='rooms' name='rooms' type='text' onChange={formik.handleChange}
                        onBlur={formik.handleBlur} value={formik.values.rooms}/>
                    {
                        formik.touched.rooms && formik.errors.rooms ?
                        (<div className="error">{formik.errors.rooms}</div>) : null
                    }
                </div>
                <div className="FieldContainer">
                    <label id="label" htmlFor="floors">Pisos </label>
                    <input id='floors' name='floors' type='text' onChange={formik.handleChange}
                        onBlur={formik.handleBlur} value={formik.values.floors}/>
                    {
                        formik.touched.floors && formik.errors.floors ?
                        (<div className="error">{formik.errors.floors}</div>) : null
                    }
                </div>
                <div className="FieldContainer">
                    <label id="label" htmlFor="garage">Cochera </label>
                    <select id="garage" name='garage' type='text' onChange={formik.handleChange}
                        onBlur={formik.handleBlur} value={formik.values.garage}>
                        <option value={true}>Si</option>
                        <option value={false}>No</option>
                    </select>
                    {
                        formik.touched.garage && formik.errors.garage ?
                        (<div className="error">{formik.errors.garage}</div>) : null
                    }
                </div>
                <div className="FieldContainer">
                    <label id="label" htmlFor="m2">Tamaño (m2) </label>
                    <input id='m2' name='m2' type='text' onChange={formik.handleChange}
                        onBlur={formik.handleBlur} value={formik.values.m2}/>
                    {
                        formik.touched.m2 && formik.errors.m2 ?
                        (<div className="error">{formik.errors.m2}</div>) : null
                    }
                </div>
                <div className="FieldContainer">
                    <label id="label" htmlFor="state">Estado </label>
                    <select id="state" name='state' type='text' onChange={formik.handleChange}
                        onBlur={formik.handleBlur} value={formik.values.sate}>
                        <option value='for sale'>En venta</option>
                        <option value='for rent'>En alquiler</option>
                    </select>
                    {
                        formik.touched.state && formik.errors.state ?
                        (<div className="error">{formik.errors.state}</div>) : null
                    }
                </div>
                <div className="FieldContainer">
                    <label id="label" htmlFor="price">Precio ($) </label>
                    <input id='price' name='price' type='text' onChange={formik.handleChange}
                        onBlur={formik.handleBlur} value={formik.values.price}/>
                    {
                        formik.touched.price && formik.errors.price ?
                        (<div className="error">{formik.errors.price}</div>) : null
                    }
                </div>
                <div className="FieldContainer">
                    <label id="label" htmlFor="expenses">Expensas ($) </label>
                    <input id='expenses' name='expenses' type='text' onChange={formik.handleChange}
                        onBlur={formik.handleBlur} value={formik.values.expenses}/>
                    {
                        formik.touched.expenses && formik.errors.expenses ?
                        (<div className="error">{formik.errors.expenses}</div>) : null
                    }
                </div>
                <div className="FieldContainer">
                    <label id="label" htmlFor="description">Descripción </label>
                    <input id="description" name="description" type='text' onChange={formik.handleChange}
                        onBlur={formik.handleBlur} value={formik.values.description}/>
                    {
                        formik.touched.description && formik.errors.description ?
                        (<div className="error">{formik.errors.description}</div>) : null
                    }
                </div>
                <div className="FieldContainer">
                    <label id="label" htmlFor="images">Imágenes </label>
                    <input id="images" name="images" type='text' onChange={formik.handleChange}
                        onBlur={formik.handleBlur} value={formik.values.images}/>
                    {
                        formik.touched.images && formik.errors.images ?
                        (<div className="error">{formik.errors.images}</div>) : null
                    }
                    {/* <button type="button" onClick={e => handleClick(e)}>+</button> */}
                </div>
                <button className="FormButton" type='submit'>Enviar</button>
            </form>
        </div>
    );
};