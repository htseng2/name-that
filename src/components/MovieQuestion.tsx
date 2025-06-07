import React from 'react';
import tvImage from '../assets/tv.webp';

interface MovieQuestionProps {
  movieScreenshotUrl?: string;
}

const MovieQuestion: React.FC<MovieQuestionProps> = ({ movieScreenshotUrl }) => {
  const tvMonitorImageUrl = tvImage;

  return (
    <div className="relative w-fit my-[6px] mx-auto">
      <img
        src={tvMonitorImageUrl}
        alt="TV Monitor"
        className="block 
        w-[400px] h-[231px]
        w1194:w-[900px] w1194:h-[521px]
        w1280:w-[1000px] w1280:h-[579px]
        w1366:w-[950px] w1366:h-[550px]
        w1440:w-[1050px] w1440:h-[608px]
        w1920:w-[1092px] w1920:h-[632px]
        w2560:w-[1200px] w2560:h-[694px]"
      />
      {movieScreenshotUrl ? (
        <img
          src={movieScreenshotUrl}
          alt="Movie Screenshot"
          className="absolute object-cover border-2 border-black
          top-[9px] left-[9px] w-[377px] h-[200px]
          w1194:top-[21px] w1194:left-[19px] w1194:w-[849px] w1194:h-[450px]
          w1280:top-[23px] w1280:left-[21px] w1280:w-[943px] w1280:h-[500px]
          w1366:top-[22px] w1366:left-[20px] w1366:w-[896px] w1366:h-[475px]
          w1440:top-[25px] w1440:left-[22px] w1440:w-[989px] w1440:h-[525px]
          w1920:top-[25px] w1920:left-[23px] w1920:w-[1030px] w1920:h-[546px]
          w2560:top-[27px] w2560:left-[25px] w2560:w-[1132px] w2560:h-[600px]"
        />
      ) : (
        <div
          className="absolute object-cover border-2 border-black flex items-center justify-center bg-gray-300 text-gray-600
        top-[9px] left-[9px] w-[377px] h-[200px]
        w1194:top-[21px] w1194:left-[19px] w1194:w-[849px] w1194:h-[450px]
        w1280:top-[23px] w1280:left-[21px] w1280:w-[943px] w1280:h-[500px]
        w1366:top-[22px] w1366:left-[20px] w1366:w-[896px] w1366:h-[475px]
        w1440:top-[25px] w1440:left-[22px] w1440:w-[989px] w1440:h-[525px]
        w1920:top-[25px] w1920:left-[23px] w1920:w-[1030px] w1920:h-[546px]
        w2560:top-[27px] w2560:left-[25px] w2560:w-[1132px] w2560:h-[600px]"
        >
          <span
            className="
          text-xs
          w1194:text-base
          w1280:text-lg
          w1366:text-base
          w1440:text-lg
          w1920:text-xl
          w2560:text-2xl"
          >
            No Screenshot Available
          </span>
        </div>
      )}
    </div>
  );
};

export default MovieQuestion;
