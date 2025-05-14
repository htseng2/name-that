import React, { useState, useRef, useEffect } from "react";
import NavigationButton from "../components/NavigationButton";
import "./QuestionScreen.css";
import questionMark from "../assets/question-mark.webp";
import playIcon from "../assets/play.webp";
import pauseIcon from "../assets/pause.webp";
import songFile from "../assets/songs/baby-one-more-time.m4a";

function QuestionScreen({ round, questionIndex, onNext, onPrevious }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef(null);
  const progressBarElapsedRef = useRef(null);

  // Effect to update progress bar width
  useEffect(() => {
    if (audioRef.current && progressBarElapsedRef.current) {
      const percentage = duration > 0 ? (currentTime / duration) * 100 : 0;
      progressBarElapsedRef.current.style.width = `${percentage}%`;
    }
  }, [currentTime, duration]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSongEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    // Optional: audioRef.current.currentTime = 0; // Reset song to beginning
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="question-screen">
      <audio
        ref={audioRef}
        src={songFile}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleSongEnd}
      />
      <NavigationButton
        onClick={onPrevious}
        show={true}
        direction="previous"
        label="Previous Question"
      />
      <NavigationButton
        onClick={onNext}
        show={true}
        direction="next"
        label="Answer Question"
      />
      <div className="question-header">
        <div className="question-header-round">ROUND {round}</div>
        <div className="question-header-number">
          QUESTION {questionIndex + 1}
        </div>
      </div>
      <div className="music-player-container">
        <div className="question-visual-placeholder">
          <img src={questionMark} alt="Question Mark" />
        </div>
        <button className="play-button" onClick={togglePlayPause}>
          <img
            src={isPlaying ? pauseIcon : playIcon}
            alt={isPlaying ? "Pause" : "Play"}
          />
        </button>
        <div className="play-bar-container">
          <span className="current-time">{formatTime(currentTime)}</span>
          <div className="progress-bar-background">
            <div
              className="progress-bar-elapsed"
              ref={progressBarElapsedRef}
            ></div>
          </div>
          <span className="total-duration">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}

export default QuestionScreen;
