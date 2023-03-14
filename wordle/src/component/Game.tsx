import React from 'react';

interface LetterObject {
  status: 'input' | 'wrong' | 'hasLetter' | 'right' | 'unInput';
  letter: string;
}

interface RowProps {
  gameData: LetterObject[];
}

interface LetterProps {
  rowData: LetterObject;
}

const Box: React.FC<LetterProps> = ({ rowData }) => {
  const boxStyleUninput = 'border border-gray-400';
  const boxStyleInput = 'border text-4xl font-medium border-black';
  const boxStyleWrong = 'text-4xl font-medium bg-[#787c7e] text-white';
  const boxStyleHasLetter = 'text-4xl font-medium bg-[#c9b458] text-white';
  const boxStyleRight = 'text-4xl font-medium bg-[#6aaa64] text-white';

  let boxStyle = 'flex justify-center items-center w-16 h-16';

  switch (rowData.status) {
    case 'input':
      boxStyle = boxStyle.concat(' ', boxStyleInput);
      break;
    case 'wrong':
      boxStyle = boxStyle.concat(' ', boxStyleWrong);
      break;
    case 'hasLetter':
      boxStyle = boxStyle.concat(' ', boxStyleHasLetter);
      break;
    case 'right':
      boxStyle = boxStyle.concat(' ', boxStyleRight);
      break;
    default:
      boxStyle = boxStyle.concat(' ', boxStyleUninput);
      break;
  }

  return <div className={boxStyle}>{rowData.letter}</div>;
};

const Row: React.FC<RowProps> = ({ gameData }) => {
  return (
    <div className="flex justify-center gap-1.5">
      {gameData.map((data, index) => (
        <Box key={index} rowData={data} />
      ))}
    </div>
  );
};

const Game: React.FC = () => {
  const data: LetterObject[][] = [
    [
      { status: 'right', letter: 'L' },
      { status: 'wrong', letter: 'A' },
      { status: 'unInput', letter: '' },
      { status: 'unInput', letter: '' },
      { status: 'unInput', letter: '' },
    ],
    [
      { status: 'unInput', letter: '' },
      { status: 'unInput', letter: '' },
      { status: 'unInput', letter: '' },
      { status: 'unInput', letter: '' },
      { status: 'unInput', letter: '' },
    ],
    [
      { status: 'unInput', letter: '' },
      { status: 'unInput', letter: '' },
      { status: 'unInput', letter: '' },
      { status: 'unInput', letter: '' },
      { status: 'unInput', letter: '' },
    ],
    [
      { status: 'input', letter: 'A' },
      { status: 'unInput', letter: '' },
      { status: 'hasLetter', letter: 'K' },
      { status: 'unInput', letter: '' },
      { status: 'unInput', letter: '' },
    ],
    [
      { status: 'unInput', letter: '' },
      { status: 'unInput', letter: '' },
      { status: 'unInput', letter: '' },
      { status: 'unInput', letter: '' },
      { status: 'unInput', letter: '' },
    ],
    [
      { status: 'unInput', letter: '' },
      { status: 'unInput', letter: '' },
      { status: 'unInput', letter: '' },
      { status: 'unInput', letter: '' },
      { status: 'unInput', letter: '' },
    ],
  ];

  return (
    <div className="flex flex-col gap-1.5 my-60">
      {data.map((data, index) => (
        <Row key={index} gameData={data} />
      ))}
    </div>
  );
};
export default Game;
