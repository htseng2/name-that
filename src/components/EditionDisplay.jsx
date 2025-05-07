import React from "react";
import "./EditionDisplay.css";
import notAvailable from "../assets/editions/not-available.webp";

function EditionDisplay({ edition }) {
  const imgSrc = edition?.img ?? notAvailable;
  const altText = edition?.title ?? "placeholder";
  return (
    <div className="image-display">
      <img src={imgSrc} alt={altText} />
    </div>
  );
}

export default EditionDisplay;
