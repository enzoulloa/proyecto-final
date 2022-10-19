import React, { useState } from "react";
import "./carousel.scss";

export default function Carousel(props) {
    const images = props.images
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [selectedImage, setSelectedImage] = useState(images[0])
    
    const previous = () => {
        const condition = selectedIndex > 0;
        const nextIndex = condition ? selectedIndex - 1 : images.length - 1;
        setSelectedImage(images[nextIndex]);
        setSelectedIndex(nextIndex);
    }

    const next = () => {
        const condition = selectedIndex < images.length;
        const nextIndex = condition ? selectedIndex + 1 : 0;
        setSelectedImage(images[nextIndex]);
        setSelectedIndex(nextIndex);
    }

    return (
        <div>
            {images.length > 1 ? (
            <div>
                    <img src={selectedImage} className="img-carousel" alt={`imagen ${selectedImage}`} />
                <div className="div-carousel">
                    <button onClick={previous} className="btn-carousel">{"< anterior"}</button>
                    <button onClick={next} className="btn-carousel">{" siguiente >"}</button>
                </div>
            </div>) : ( <img src={images[0]} className="img-carousel" alt={`imagen ${images[0]}`}/>)}
        </div>
    )
}