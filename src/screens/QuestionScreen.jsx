import React, { useState, useRef, useEffect } from "react";
import NavigationButton from "../components/NavigationButton";
import "./QuestionScreen.css";
import questionMark from "../assets/question-mark.webp";
import playIcon from "../assets/play.webp";
import pauseIcon from "../assets/pause.webp";
import songFile from "../assets/songs/baby-one-more-time.m4a";
import volumeIcon from "../assets/volume.webp";
import muteIcon from "../assets/mute.webp";

function QuestionScreen({ round, questionIndex, onNext, onPrevious }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1); // Volume from 0 to 1
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef(null);
  const progressBarElapsedRef = useRef(null);
  const volumeBarElapsedRef = useRef(null);

  // Initialize audio volume and muted state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, []); // Runs once on mount

  // Update audio volume when volume state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Update audio muted state when isMuted state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Effect to update progress bar width
  useEffect(() => {
    if (progressBarElapsedRef.current) {
      const percentage = duration > 0 ? (currentTime / duration) * 100 : 0;
      progressBarElapsedRef.current.style.width = `${percentage}%`;
    }
  }, [currentTime, duration]);

  // Effect to update volume bar width
  useEffect(() => {
    if (volumeBarElapsedRef.current) {
      volumeBarElapsedRef.current.style.width = isMuted
        ? `0%`
        : `${volume * 100}%`;
    }
  }, [volume, isMuted]);

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
    // Set initial volume for the audio element after metadata is loaded
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  };

  const handleSongEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleVolumeBarClick = (event) => {
    if (!audioRef.current) return;
    const bar = event.currentTarget;
    const rect = bar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const barWidth = rect.width;
    let newVolume = clickX / barWidth;
    newVolume = Math.max(0, Math.min(1, newVolume)); // Clamp between 0 and 1
    setVolume(newVolume);
    setIsMuted(false); // Unmute if user interacts with volume bar
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
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
        <div className="play-controls-container">
          <button className="play-button" onClick={togglePlayPause}>
            <img
              src={isPlaying ? pauseIcon : playIcon}
              alt={isPlaying ? "Pause" : "Play"}
            />
          </button>
          <div className="volume-bar-container">
            <img
              src={isMuted || volume === 0 ? muteIcon : volumeIcon}
              alt={isMuted || volume === 0 ? "Unmute" : "Mute"}
              onClick={toggleMute}
            />
            <div
              className="volume-bar-background"
              onClick={handleVolumeBarClick}
            >
              <div
                className="volume-bar-elapsed"
                ref={volumeBarElapsedRef}
              ></div>
            </div>
          </div>
        </div>
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
