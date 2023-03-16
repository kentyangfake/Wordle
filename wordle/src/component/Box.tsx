import React from 'react';
import { Status, BoxType } from './Type';

interface BoxProps {
  boxContent: BoxType;
}

const Box: React.FC<BoxProps> = ({ boxContent }) => {
  const BoxStatus: { [key in Status]: string } = {
    [Status.Blank]: 'border border-gray-400',
    [Status.Active]: 'border text-4xl font-medium border-black',
    [Status.Gray]: 'text-4xl font-medium bg-[#787c7e] text-white',
    [Status.Yellow]: 'text-4xl font-medium bg-[#c9b458] text-white',
    [Status.Green]: 'text-4xl font-medium bg-[#6aaa64] text-white',
  };

  const boxStyle = BoxStatus[boxContent.status];

  return (
    <div className={`flex justify-center items-center w-16 h-16 ${boxStyle}`}>
      {boxContent.letter}
    </div>
  );
};

export default Box;
