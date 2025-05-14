import React, { useState, useRef, useEffect, useCallback } from "react";
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
  const [isDraggingProgress, setIsDraggingProgress] = useState(false);
  const [isDraggingVolume, setIsDraggingVolume] = useState(false); // New state for volume drag

  const audioRef = useRef(null);
  const progressBarElapsedRef = useRef(null);
  const volumeBarElapsedRef = useRef(null);
  const progressBarBackgroundRef = useRef(null); // Ref for progress bar background
  const volumeBarBackgroundRef = useRef(null); // New ref for volume bar background

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
    if (!audioRef.current) return;
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
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
    audioRef.current.volume = volume;
    audioRef.current.muted = isMuted;
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

  // --- Draggable Progress Bar Logic ---
  const updateCurrentTimeFromScrub = useCallback(
    (clientX) => {
      if (
        !audioRef.current ||
        !progressBarBackgroundRef.current ||
        duration === 0
      )
        return;
      const bar = progressBarBackgroundRef.current;
      const rect = bar.getBoundingClientRect();
      const x = clientX - rect.left;
      const width = rect.width;
      let newTimePercentage = x / width;
      newTimePercentage = Math.max(0, Math.min(1, newTimePercentage));
      const newCurrentTime = newTimePercentage * duration;

      audioRef.current.currentTime = newCurrentTime;
      setCurrentTime(newCurrentTime); // Update state to reflect the scrub
    },
    [duration]
  ); // duration is a key dependency here

  const handleProgressMouseDown = useCallback(
    (event) => {
      setIsDraggingProgress(true);
      updateCurrentTimeFromScrub(event.clientX);
    },
    [updateCurrentTimeFromScrub]
  );

  const handleProgressTouchStart = useCallback(
    (event) => {
      setIsDraggingProgress(true);
      updateCurrentTimeFromScrub(event.touches[0].clientX);
    },
    [updateCurrentTimeFromScrub]
  );

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isDraggingProgress) {
        updateCurrentTimeFromScrub(event.clientX);
      }
    };
    const handleMouseUp = () => {
      if (isDraggingProgress) {
        setIsDraggingProgress(false);
        // Optional: if audio was paused before drag, ensure it remains paused.
        // This might be needed if play() is inadvertently called on drag.
      }
    };
    const handleTouchMove = (event) => {
      if (isDraggingProgress) {
        updateCurrentTimeFromScrub(event.touches[0].clientX);
      }
    };
    const handleTouchEnd = () => {
      if (isDraggingProgress) {
        setIsDraggingProgress(false);
      }
    };

    if (isDraggingProgress) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDraggingProgress, updateCurrentTimeFromScrub]);

  // --- Volume Logic (Original handleVolumeBarClick is modified to be part of draggable logic) ---
  const toggleMute = () => setIsMuted(!isMuted);

  // --- Draggable Volume Bar Logic ---
  const updateVolumeFromScrub = useCallback((clientX) => {
    if (!volumeBarBackgroundRef.current) return;
    const bar = volumeBarBackgroundRef.current;
    const rect = bar.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    let newVolume = x / width;
    newVolume = Math.max(0, Math.min(1, newVolume)); // Clamp between 0 and 1
    setVolume(newVolume);
    setIsMuted(false); // Unmute if user interacts with volume bar
  }, []); // No external state dependencies other than setVolume/setIsMuted

  const handleVolumeMouseDown = useCallback(
    (event) => {
      setIsDraggingVolume(true);
      updateVolumeFromScrub(event.clientX);
    },
    [updateVolumeFromScrub]
  );

  const handleVolumeTouchStart = useCallback(
    (event) => {
      setIsDraggingVolume(true);
      updateVolumeFromScrub(event.touches[0].clientX);
    },
    [updateVolumeFromScrub]
  );

  useEffect(() => {
    const handleDocumentMouseMoveForVolume = (event) => {
      if (isDraggingVolume) {
        updateVolumeFromScrub(event.clientX);
      }
    };
    const handleDocumentMouseUpForVolume = () => {
      if (isDraggingVolume) {
        setIsDraggingVolume(false);
      }
    };
    const handleDocumentTouchMoveForVolume = (event) => {
      if (isDraggingVolume) {
        updateVolumeFromScrub(event.touches[0].clientX);
      }
    };
    const handleDocumentTouchEndForVolume = () => {
      if (isDraggingVolume) {
        setIsDraggingVolume(false);
      }
    };

    if (isDraggingVolume) {
      document.addEventListener("mousemove", handleDocumentMouseMoveForVolume);
      document.addEventListener("mouseup", handleDocumentMouseUpForVolume);
      document.addEventListener("touchmove", handleDocumentTouchMoveForVolume);
      document.addEventListener("touchend", handleDocumentTouchEndForVolume);
    } else {
      document.removeEventListener(
        "mousemove",
        handleDocumentMouseMoveForVolume
      );
      document.removeEventListener("mouseup", handleDocumentMouseUpForVolume);
      document.removeEventListener(
        "touchmove",
        handleDocumentTouchMoveForVolume
      );
      document.removeEventListener("touchend", handleDocumentTouchEndForVolume);
    }

    return () => {
      document.removeEventListener(
        "mousemove",
        handleDocumentMouseMoveForVolume
      );
      document.removeEventListener("mouseup", handleDocumentMouseUpForVolume);
      document.removeEventListener(
        "touchmove",
        handleDocumentTouchMoveForVolume
      );
      document.removeEventListener("touchend", handleDocumentTouchEndForVolume);
    };
  }, [isDraggingVolume, updateVolumeFromScrub]);

  // Simplified original handleVolumeBarClick - now only for non-drag clicks if needed,
  // but drag start handles the click too. For consistency, using drag handlers for click as well.
  // const handleVolumeBarClick = (event) => updateVolumeFromScrub(event.clientX);

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
              ref={volumeBarBackgroundRef}
              onMouseDown={handleVolumeMouseDown}
              onTouchStart={handleVolumeTouchStart}
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
          <div
            className="progress-bar-background"
            ref={progressBarBackgroundRef}
            onMouseDown={handleProgressMouseDown}
            onTouchStart={handleProgressTouchStart}
          >
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
