import React from "react";
// import "./EditionDisplay.css"; // Remove this import
import notAvailable from "../assets/editions/not-available.webp";

function EditionDisplay({ edition }) {
  const imgSrc = edition?.img ?? notAvailable;
  const altText = edition?.title ?? "placeholder";
  return (
    <div className="col-start-4 col-span-3 row-start-2 w-[198px] h-[198px] w1194:w-[386px] w1194:h-[386px] w1280:w-[492px] w1280:h-[492px] w1366:w-[370px] w1366:h-[370px] w1440:w-[492px] w1440:h-[492px] w1920:w-[588px] w1920:h-[588px] w2560:w-[750px] w2560:h-[750px] justify-self-center self-center border-4 border-[#053b60]">
      <img
        src={imgSrc}
        alt={altText}
        className="w-full h-full object-contain object-center block"
      />
    </div>
  );
}

export default EditionDisplay;
