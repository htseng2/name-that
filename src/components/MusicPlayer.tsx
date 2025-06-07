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
    <div
      className="relative w-fit my-[6px] mx-auto rounded-[12px] bg-black
      w-[412px] pt-4 pb-4
      w1194:w-[900px] w1194:h-[480px] w1194:rounded-[24px]
      w1280:w-[1000px] w1280:h-[540px]
      w1366:w-[950px] w1366:h-[510px]
      w1440:w-[1050px] w1440:h-[570px]
      w1920:w-[1092px] w1920:h-[590px]
      w2560:w-[1200px] w2560:h-[650px]"
    >
      <audio
        ref={audioRef}
        src={songUrl}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleSongEnd}
      />

      <div
        className="bg-neutral-700 rounded-[12px] mx-auto flex items-center justify-center
        w-[340px] h-[100px] mt-[8px] py-[8px]
        w1194:w-[800px] w1194:h-[300px] w1194:mt-[28px] w1194:py-[24px] w1194:rounded-[24px]
        w1280:w-[880px] w1280:h-[330px] w1280:mt-[32px] w1280:py-[28px]
        w1366:w-[840px] w1366:h-[315px] w1366:mt-[30px] w1366:py-[26px]
        w1440:w-[920px] w1440:h-[350px] w1440:mt-[35px] w1440:py-[30px]
        w1920:w-[960px] w1920:h-[365px] w1920:mt-[38px] w1920:py-[32px]
        w2560:w-[1050px] w2560:h-[400px] w2560:mt-[42px] w2560:py-[35px]"
      >
        <img src={questionMark} alt="Question Visual" className="w-full h-full object-contain" />
      </div>

      <div
        className="flex flex-col gap-1
        mt-[8px] mx-[12px]
        w1194:mt-[24px] w1194:mx-[50px] w1194:gap-2
        w1280:mt-[28px] w1280:mx-[55px] w1280:gap-2
        w1366:mt-[26px] w1366:mx-[52px] w1366:gap-2
        w1440:mt-[30px] w1440:mx-[58px] w1440:gap-3
        w1920:mt-[32px] w1920:mx-[61px] w1920:gap-3
        w2560:mt-[36px] w2560:mx-[67px] w2560:gap-4"
      >
        {/* Play Button and Volume Control Row */}
        <div className="flex items-center justify-between">
          {/* Empty div for spacing */}
          <div className="flex-1"></div>

          {/* Play/Pause Button - Centered */}
          <button
            onClick={togglePlayPause}
            className="bg-white rounded-full flex items-center justify-center border-none p-0 cursor-pointer
              w-[28px] h-[28px]
              w1194:w-[50px] w1194:h-[50px]
              w1280:w-[55px] w1280:h-[55px]
              w1366:w-[52px] w1366:h-[52px]
              w1440:w-[58px] w1440:h-[58px]
              w1920:w-[60px] w1920:h-[60px]
              w2560:w-[67px] w2560:h-[67px]"
          >
            <img
              src={isPlaying ? pauseIcon : playIcon}
              alt={isPlaying ? 'Pause' : 'Play'}
              className="object-contain
                w-[10px] h-[10px]
                w1194:w-[18px] w1194:h-[18px]
                w1280:w-[20px] w1280:h-[20px]
                w1366:w-[19px] w1366:h-[19px]
                w1440:w-[21px] w1440:h-[21px]
                w1920:w-[22px] w1920:h-[22px]
                w2560:w-[24px] w2560:h-[24px]"
            />
          </button>

          {/* Volume Control - Right aligned */}
          <div
            className="flex items-center gap-1 flex-1 justify-end
            w1194:gap-2
            w1280:gap-2
            w1366:gap-2
            w1440:gap-2
            w1920:gap-2
            w2560:gap-2"
          >
            <img
              src={isMuted || volume === 0 ? muteIcon : volumeIcon}
              alt="Volume"
              onClick={toggleMute}
              className="cursor-pointer
                w-3 h-3
                w1194:w-6 w1194:h-6
                w1280:w-6 w1280:h-6
                w1366:w-6 w1366:h-6
                w1440:w-7 w1440:h-7
                w1920:w-7 w1920:h-7
                w2560:w-8 w2560:h-8"
            />
            <div
              ref={volumeBarBackgroundRef}
              className="bg-neutral-700 rounded-full overflow-hidden relative cursor-pointer
                w-[60px] h-[3px]
                w1194:w-[100px] w1194:h-[6px]
                w1280:w-[110px] w1280:h-[6px]
                w1366:w-[105px] w1366:h-[6px]
                w1440:w-[115px] w1440:h-[6px]
                w1920:w-[120px] w1920:h-[6px]
                w2560:w-[130px] w2560:h-[7px]"
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

        {/* Progress Bar and Time Displays Row */}
        <div
          className="flex items-center gap-1
          w1194:gap-3
          w1280:gap-3
          w1366:gap-3
          w1440:gap-3
          w1920:gap-3
          w2560:gap-3"
        >
          <span
            className="font-sans font-normal leading-none text-neutral-400
            text-xs
            w1194:text-xl
            w1280:text-xl
            w1366:text-lg
            w1440:text-xl
            w1920:text-xl
            w2560:text-2xl"
          >
            {formatTime(currentTime)}
          </span>
          <div
            ref={progressBarBackgroundRef}
            className="flex-grow bg-neutral-700 rounded-full overflow-hidden relative cursor-pointer
              h-[3px]
              w1194:h-[6px]
              w1280:h-[6px]
              w1366:h-[6px]
              w1440:h-[6px]
              w1920:h-[6px]
              w2560:h-[7px]"
            onMouseDown={handleProgressMouseDown}
            onTouchStart={handleProgressTouchStart}
          >
            <div
              ref={progressBarElapsedRef}
              className="h-full bg-neutral-200 rounded-full"
              style={{ width: '0%' }}
            />
          </div>
          <span
            className="font-sans font-normal leading-none text-neutral-400
            text-xs
            w1194:text-xl
            w1280:text-xl
            w1366:text-lg
            w1440:text-xl
            w1920:text-xl
            w2560:text-2xl"
          >
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
