import React from "react";
import tvImage from "../assets/tv.webp";
import PropTypes from "prop-types";

const MovieQuestion = ({ movieScreenshotUrl }) => {
  const tvMonitorImageUrl = tvImage;

  return (
    <div className="relative w-fit my-[6px] mx-auto">
      <img
        src={tvMonitorImageUrl}
        alt="TV Monitor"
        className="block w-[1092px] h-[632px]"
      />
      {movieScreenshotUrl ? (
        <img
          src={movieScreenshotUrl}
          alt="Movie Screenshot"
          className="absolute top-[25px] left-[23px] w-[1030px] h-[546px] object-cover border-2 border-black"
        />
      ) : (
        <div className="absolute top-[25px] left-[23px] w-[1030px] h-[546px] object-cover border-2 border-black flex items-center justify-center bg-gray-300 text-gray-600">
          <span>No Screenshot Available</span>
        </div>
      )}
    </div>
  );
};

MovieQuestion.propTypes = {
  movieScreenshotUrl: PropTypes.string,
};

export default MovieQuestion;
