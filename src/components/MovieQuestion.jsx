import React from "react";
import "./MovieQuestion.css";
import tvImage from "../assets/tv.webp";

const MovieQuestion = ({ movieScreenshotUrl }) => {
  // Placeholder TV monitor image URL - replace with your actual image
  const tvMonitorImageUrl = tvImage;

  return (
    <div className="movie-question-container">
      <img
        src={tvMonitorImageUrl}
        alt="TV Monitor"
        className="tv-monitor-image"
      />
      <img
        src={movieScreenshotUrl}
        alt="Movie Screenshot"
        className="movie-screenshot-image"
      />
    </div>
  );
};

export default MovieQuestion;
