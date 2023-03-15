import React from 'react';

enum Status {
  Active,
  Gray,
  Yellow,
  Green,
  Blank,
}

interface BoxType {
  status: Status;
  letter: string;
}

interface BoxProps {
  letterObject: BoxType;
}

const Box: React.FC<BoxProps> = ({ letterObject }) => {
  const BoxStatus: { [key: string]: string } = {
    blank: 'border border-gray-400',
    active: 'border text-4xl font-medium border-black',
    gray: 'text-4xl font-medium bg-[#787c7e] text-white',
    yellow: 'text-4xl font-medium bg-[#c9b458] text-white',
    green: 'text-4xl font-medium bg-[#6aaa64] text-white',
  };

  let boxStyle = 'flex justify-center items-center w-16 h-16';

  switch (letterObject.status) {
    case Status.Active:
      boxStyle = boxStyle.concat(' ', BoxStatus.active);
      break;
    case Status.Gray:
      boxStyle = boxStyle.concat(' ', BoxStatus.gray);
      break;
    case Status.Yellow:
      boxStyle = boxStyle.concat(' ', BoxStatus.yellow);
      break;
    case Status.Green:
      boxStyle = boxStyle.concat(' ', BoxStatus.green);
      break;
    default:
      boxStyle = boxStyle.concat(' ', BoxStatus.blank);
      break;
  }

  return <div className={boxStyle}>{letterObject.letter}</div>;
};

export default Box;
