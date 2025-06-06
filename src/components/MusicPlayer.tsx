import React, { useState, useRef, useEffect, useCallback } from 'react';
import questionMark from '../assets/question-mark.webp';
import playIcon from '../assets/play.webp';
import pauseIcon from '../assets/pause.webp';
import volumeIcon from '../assets/volume.webp';
import muteIcon from '../assets/mute.webp';

interface MusicPlayerProps {
  songUrl: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ songUrl }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1); // Volume from 0 to 1
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isDraggingProgress, setIsDraggingProgress] = useState<boolean>(false);
  const [isDraggingVolume, setIsDraggingVolume] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarElapsedRef = useRef<HTMLDivElement | null>(null);
  const volumeBarElapsedRef = useRef<HTMLDivElement | null>(null);
  const progressBarBackgroundRef = useRef<HTMLDivElement | null>(null);
  const volumeBarBackgroundRef = useRef<HTMLDivElement | null>(null);

  // Reset player state when song changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  }, [songUrl]);

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
      volumeBarElapsedRef.current.style.width = isMuted ? `0%` : `${volume * 100}%`;
    }
  }, [volume, isMuted]);

  const togglePlayPause = (): void => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = (): void => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = (): void => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
    audioRef.current.volume = volume;
    audioRef.current.muted = isMuted;
  };

  const handleSongEnd = (): void => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const updateCurrentTimeFromScrub = useCallback(
    (clientX: number): void => {
      if (!audioRef.current || !progressBarBackgroundRef.current || duration === 0) return;
      const bar = progressBarBackgroundRef.current;
      const rect = bar.getBoundingClientRect();
      const x = clientX - rect.left;
      const width = rect.width;
      let newTimePercentage = x / width;
      newTimePercentage = Math.max(0, Math.min(1, newTimePercentage));
      const newCurrentTime = newTimePercentage * duration;

      audioRef.current.currentTime = newCurrentTime;
      setCurrentTime(newCurrentTime);
    },
    [duration]
  );

  const handleProgressMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>): void => {
      setIsDraggingProgress(true);
      updateCurrentTimeFromScrub(event.clientX);
    },
    [updateCurrentTimeFromScrub]
  );

  const handleProgressTouchStart = useCallback(
    (event: React.TouchEvent<HTMLDivElement>): void => {
      setIsDraggingProgress(true);
      updateCurrentTimeFromScrub(event.touches[0].clientX);
    },
    [updateCurrentTimeFromScrub]
  );

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent): void => {
      if (isDraggingProgress) {
        updateCurrentTimeFromScrub(event.clientX);
      }
    };
    const handleMouseUp = (): void => {
      if (isDraggingProgress) {
        setIsDraggingProgress(false);
      }
    };
    const handleTouchMove = (event: TouchEvent): void => {
      if (isDraggingProgress) {
        updateCurrentTimeFromScrub(event.touches[0].clientX);
      }
    };
    const handleTouchEnd = (): void => {
      if (isDraggingProgress) {
        setIsDraggingProgress(false);
      }
    };

    if (isDraggingProgress) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDraggingProgress, updateCurrentTimeFromScrub]);

  const toggleMute = (): void => setIsMuted(!isMuted);

  const updateVolumeFromScrub = useCallback((clientX: number): void => {
    if (!volumeBarBackgroundRef.current) return;
    const bar = volumeBarBackgroundRef.current;
    const rect = bar.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    let newVolume = x / width;
    newVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(newVolume);
    setIsMuted(false);
  }, []);

  const handleVolumeMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>): void => {
      setIsDraggingVolume(true);
      updateVolumeFromScrub(event.clientX);
    },
    [updateVolumeFromScrub]
  );

  const handleVolumeTouchStart = useCallback(
    (event: React.TouchEvent<HTMLDivElement>): void => {
      setIsDraggingVolume(true);
      updateVolumeFromScrub(event.touches[0].clientX);
    },
    [updateVolumeFromScrub]
  );

  useEffect(() => {
    const handleDocumentMouseMoveForVolume = (event: MouseEvent): void => {
      if (isDraggingVolume) {
        updateVolumeFromScrub(event.clientX);
      }
    };
    const handleDocumentMouseUpForVolume = (): void => {
      if (isDraggingVolume) {
        setIsDraggingVolume(false);
      }
    };
    const handleDocumentTouchMoveForVolume = (event: TouchEvent): void => {
      if (isDraggingVolume) {
        updateVolumeFromScrub(event.touches[0].clientX);
      }
    };
    const handleDocumentTouchEndForVolume = (): void => {
      if (isDraggingVolume) {
        setIsDraggingVolume(false);
      }
    };

    if (isDraggingVolume) {
      document.addEventListener('mousemove', handleDocumentMouseMoveForVolume);
      document.addEventListener('mouseup', handleDocumentMouseUpForVolume);
      document.addEventListener('touchmove', handleDocumentTouchMoveForVolume);
      document.addEventListener('touchend', handleDocumentTouchEndForVolume);
    } else {
      document.removeEventListener('mousemove', handleDocumentMouseMoveForVolume);
      document.removeEventListener('mouseup', handleDocumentMouseUpForVolume);
      document.removeEventListener('touchmove', handleDocumentTouchMoveForVolume);
      document.removeEventListener('touchend', handleDocumentTouchEndForVolume);
    }

    return () => {
      document.removeEventListener('mousemove', handleDocumentMouseMoveForVolume);
      document.removeEventListener('mouseup', handleDocumentMouseUpForVolume);
      document.removeEventListener('touchmove', handleDocumentTouchMoveForVolume);
      document.removeEventListener('touchend', handleDocumentTouchEndForVolume);
    };
  }, [isDraggingVolume, updateVolumeFromScrub]);

  return (
    <div className="absolute w-[975px] h-[530px] bottom-[53.5px] left-1/2 -translate-x-1/2 rounded-[24px] bg-black">
      <audio
        ref={audioRef}
        src={songUrl}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleSongEnd}
      />

      <div className="w-[853px] h-[321px] bg-neutral-700 rounded-[24px] mt-[38px] mx-auto flex items-center justify-center py-[31px]">
        <img src={questionMark} alt="Question Visual" className="w-full h-full object-contain" />
      </div>

      <div className="mt-[33px] mx-[61px] flex justify-center items-center relative">
        {/* Play/Pause Button, Progress Bar, and Time Displays */}
        <div className="flex items-center w-[412px] mt-3 mx-auto gap-3">
          <span className="font-sans font-normal text-xl leading-none text-neutral-400">
            {formatTime(currentTime)}
          </span>
          <div
            ref={progressBarBackgroundRef}
            className="flex-grow h-[6px] bg-neutral-700 rounded-full overflow-hidden relative cursor-pointer"
            onMouseDown={handleProgressMouseDown}
            onTouchStart={handleProgressTouchStart}
          >
            <div
              ref={progressBarElapsedRef}
              className="h-full bg-neutral-200 rounded-full"
              style={{ width: '0%' }}
            />
          </div>
          <span className="font-sans font-normal text-xl leading-none text-neutral-400">
            {formatTime(duration)}
          </span>
        </div>

        <button
          onClick={togglePlayPause}
          className="w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center border-none p-0 cursor-pointer absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <img
            src={isPlaying ? pauseIcon : playIcon}
            alt={isPlaying ? 'Pause' : 'Play'}
            className="w-[22px] h-[22px] object-contain"
          />
        </button>

        {/* Volume Control */}
        <div className="absolute top-1/2 -translate-y-1/2 right-0 flex items-center gap-2">
          <img
            src={isMuted || volume === 0 ? muteIcon : volumeIcon}
            alt="Volume"
            onClick={toggleMute}
            className="w-6 h-6 cursor-pointer"
          />
          <div
            ref={volumeBarBackgroundRef}
            className="w-[100px] h-[6px] bg-neutral-700 rounded-full overflow-hidden relative cursor-pointer"
            onMouseDown={handleVolumeMouseDown}
            onTouchStart={handleVolumeTouchStart}
          >
            <div
              ref={volumeBarElapsedRef}
              className="h-full bg-neutral-200 rounded-full"
              style={{ width: `${volume * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
