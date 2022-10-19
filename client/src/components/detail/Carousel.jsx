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
        const condition = selectedIndex < images.length - 1;
        const nextIndex = condition ? selectedIndex + 1 : 0;
        setSelectedImage(images[nextIndex]);
        setSelectedIndex(nextIndex);
    }

    return (
        <div>
            <img src={selectedImage} className="img-carousel"/>
            <div className="div-carousel">
                <button onClick={previous} className="btn-carousel">{"< anterior"}</button>
                <button onClick={next} className="btn-carousel">{" siguiente >"}</button>
            </div>
        </div>
    )
}