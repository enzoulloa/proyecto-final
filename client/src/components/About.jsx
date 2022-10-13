import React from "react";
import './About.scss';
import text from './text.js';

const img = "https://lasillarotarm.blob.core.windows.net/images/2020/11/20/barackobama.jpg";

export default function About () {

    return (
        <div className="About">
            {/* <div className="Logo">
                <img src="https://res.cloudinary.com/dwgp6lmlt/image/upload/v1665608338/photo_dbm6i5.jpg"/>
            </div> */}
            <div className="Head">
                <div className="Logo">
                    <img src="https://res.cloudinary.com/dwgp6lmlt/image/upload/v1665608338/photo_dbm6i5.jpg"/>
                </div>
                <div className="Text">
                    <h1>¿Quienes somos?</h1>
                    <h3>{text}</h3>
                    {/* <h3>  Somos una empresa inmobiliaria con años de trayectoria. Nos dedicamos a brindar servicios complementarios a la actividad inmobiliaria con un fuerte foco en el cliente. 
                    Nuestro objetivo es brindarle la mayor calidad de servicio posible, a través de una atención cálida y personalizada. La misión de nuestros equipos no es venderle una propiedad; su misión consiste en ayudarlos a encontrar lo que están buscando y asesorarlos para que puedan tomar la mejor decisión. Conocer sus deseos, sus necesidades, contenerlo, educarlo y acompañarlo durante todo el proceso que implica una decisión tan importante en sus vidas, como es la búsqueda de un nuevo hogar. </h3>  */}
                </div>
            </div>
            <div className="Staff">
                <h1>Nuestro Staff...</h1>
                <div className="Members">
                    <div className="Member">
                        <img src={img}/>
                        <div className="Member-Text">
                            <h1>Mariano</h1>
                            <h3>Un capo</h3>
                        </div>
                    </div>
                    <div className="Member">
                        <img src={img}/>
                        <div className="Member-Text">
                            <h1>Enzo</h1>
                            <h3>Un capo</h3>
                        </div>
                    </div>
                    <div className="Member">
                        <img src={img}/>
                        <div className="Member-Text">
                            <h1>Agustín</h1>
                            <h3>Un capo</h3>
                        </div>
                    </div>
                    <div className="Member">
                        <img src={img}/>
                        <div className="Member-Text">
                            <h1>Tomás 🌹</h1>
                            <h3>Un capo</h3>
                        </div>
                    </div>
                    <div className="Member">
                        <img src={img}/>
                        <div className="Member-Text">
                            <h1>Juan</h1>
                            <h3>Un capo</h3>
                        </div>
                    </div>
                    <div className="Member">
                        <img src={img}/>
                        <div className="Member-Text">
                            <h1>Bautista</h1>
                            <h3>Un capo</h3>
                        </div>
                    </div>
                    <div className="Member">
                        <img src={img}/>
                        <div className="Member-Text">
                            <h1>Franco</h1>
                            <h3>Un capo</h3>
                        </div>
                    </div>
                    <div className="Member">
                        <img src={img}/>
                        <div className="Member-Text">
                            <h1>Juan</h1>
                            <h3>Un capo</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};