import React from "react";
// import "./EditionDisplay.css"; // Remove this import
import notAvailable from "../assets/editions/not-available.webp";

function EditionDisplay({ edition }) {
  const imgSrc = edition?.img ?? notAvailable;
  const altText = edition?.title ?? "placeholder";
  return (
    <div className="col-start-4 col-span-3 row-start-2 w-[370px] h-[370px] justify-self-center self-center border-4 border-[#053b60]">
      <img
        src={imgSrc}
        alt={altText}
        className="w-full h-full object-contain object-center block"
      />
    </div>
  );
}

export default EditionDisplay;
