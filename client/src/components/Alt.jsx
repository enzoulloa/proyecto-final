import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { sellFormPost, postProperty } from '../redux/actions';

function validator ({name, surname, type, size, rooms, price, images, phoneNumber, email}) {
    let errors = {};
    if(!name || ! /^[a-zA-Z]+$/i.test(name)) errors.name = 'Debe introducir un nombre válido';
    if(!type || ! /^[a-zA-Z]+$/i.test(type)) errors.type = 'Debe introducir un tipo de propiedad válido';
    if(!location || ! /^[0-9]+$/i.test(location)) errors.location = 'Debe introducir una localización válido';
    if(!rooms || ! /^[0-9]+$/i.test(rooms)) errors.rooms = 'Debe introducir un número válido';
    if(!price || ! /^[0-9]+$/i.test(price)) errors.price = 'Debe introducir un precio válido';
    if(!phoneNumber || /^[0-9]+$/i.test(phoneNumber)) errors.phoneNumber = 'Debe introducir un número válido';
    if(!email || ! /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(email) ) errors.email = 'Debe introducir un email válido';
    return errors;
};

export default function SellForm () {

    const dispatch = useDispatch();
    const [property, setProperty] = useState({
        name: '',
        surname: '',
        type: '',
        location: '',
        rooms: 0,
        garage: false,
        m2: 0,
        rating: 0,
        expenses: 0,
        seller: '',
        description: '',
        images: null,
        state: '',
        price: 0,
        floors: 0,
        reviews: [''],
        address: '',
        phoneNumber: '',
        email: ''
    });
    const [errors, setErrors] = useState({});

    function handleChange(e) {
        setProperty({...property, [e.target.name]: e.target.value});
        setErrors(validator({...property, [e.target.name]: e.target.value}));
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (!errors.name || !errors.size || !errors.rooms || !errors.price
            || !errors.phoneNumber || !errors.email) {
            // dispatch(sellFormPost(property));
            dispatch(postProperty(property));
            setProperty({
                name: '',
                surname: '',
                type: '',
                size: 0,
                rooms: 0,
                price: 0,
                images: null,
                phoneNumber: '',
                email: ''
            });
            return alert('Formulario enviado correctamente!');
        }
        return alert('Completar correctamente!');
    };
    
    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input value={property.name} name='name' 
                        onChange={e => handleChange(e)}/>
                    {
                        errors.name && <div className={errors.name && "Form-Errors"}>
                                <p>{errors.name}</p>
                            </div>
                    }
                </div>
                <div>
                    <label>Apellido:</label>
                    <input value={property.surname} name='surname'
                        onChange={e => handleChange(e)}/>
                    {/* {
                        errors.surname && <div className={errors.surname && "Form-Errors"}>
                                <p>{errors.surname}</p>
                            </div>
                    } */}
                </div>
                <div>
                    <label>Tipo de propiedad: </label>
                    <input value={property.type} name='type'
                        onChange={e => handleChange(e)}/>
                    {
                        errors.type && <div className={errors.type && "Form-Errors"}>
                                <p>{errors.type}</p>
                            </div>
                    }
                </div>
                <div>
                    <label>Tamaño (m2):</label>
                    <input value={property.size} name='size'
                        onChange={e => handleChange(e)}/>
                    {
                        errors.size && <div className={errors.size && "Form-Errors"}>
                                <p>{errors.size}</p>
                            </div>
                    }
                </div>
                <div>
                    <label>Número de Habitaciones:</label>
                    <input value={property.rooms} name='rooms'
                        onChange={e => handleChange(e)}/>
                    {
                        errors.rooms && <div className={errors.rooms && "Form-Errors"}>
                                <p>{errors.rooms}</p>
                            </div>
                    }
                </div>
                <div>
                    <label>Precio ($):</label>
                    <input value={property.price} name='price'
                        onChange={e => handleChange(e)}/>
                    {
                        errors.price && <div className={errors.price && "Form-Errors"}>
                                <p>{errors.price}</p>
                            </div>
                    }
                </div>
                <div>
                    <label>Imágenes (adjuntar archivos):</label>
                    <input />
                </div>
                <div>
                    <label>Número de celular:</label>
                    <input value={property.phoneNumber} name='phoneNumber'
                        onChange={e => handleChange(e)}/>
                    {
                        errors.phoneNumber && <div className={errors.phoneNumber && "Form-Errors"}>
                                <p>{errors.phoneNumber}</p>
                            </div>
                    }
                    </div>
                <div>
                    <label>Email:</label>
                    <input value={property.email} name='email'
                        onChange={e => handleChange(e)}/>
                    {
                        errors.email && <div className={errors.email && "Form-Errors"}>
                                <p>{errors.email}</p>
                            </div>
                    }
                </div>
                <button type='submit'>Enviar</button>
            </form>
        </div>
    )
};