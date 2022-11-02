import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./carousel.scss";

export default function Carousel(props) {
  const ownership = useSelector((state) => state.ownershipDetail);
  const images = ownership.images;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const selectNewImage = (index, images, next = true) => {
    const condition = next
      ? selectedIndex < images.length - 1
      : selectedIndex > 0;
    const nextIndex = next
      ? condition
        ? selectedIndex + 1
        : 0
      : condition
      ? selectedIndex - 1
      : images.length - 1;
    setSelectedImage(images[nextIndex]);
    setSelectedIndex(nextIndex);
  };

  const previous = () => {
    selectNewImage(selectedIndex, images, false);
  };

  const next = () => {
    selectNewImage(selectedIndex, images);
  };

  return (
    <div>
      {images.length > 1 ? (
        <div className="div-column">
          <button onClick={previous} className="btn-carousel">
            {"<"}
          </button>
          <img
            src={selectedImage}
            className="img-carousel"
            alt={`imagen ${selectedIndex}`}
          />
          <div>
            <button onClick={next} className="btn-carousel">
              {">"}
            </button>
          </div>
        </div>
      ) : (
        <img
          src={images[0]}
          className="img-carousel"
          alt={`imagen ${images[0]}`}
        />
      )}
    </div>
  );
}
