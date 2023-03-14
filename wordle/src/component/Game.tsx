import React, { useEffect, useRef, useReducer } from 'react';

interface LetterObject {
  status: 'active' | 'gray' | 'yellow' | 'green' | 'blank';
  letter: string;
}

interface RowProps {
  rowIndex: number;
  gameData: LetterObject[];
  dispatch: React.Dispatch<Action>;
}

interface BoxProps {
  //研究可不可以用key
  boxIndex: number;
  rowIndex: number;
  rowData: LetterObject;
  dispatch: React.Dispatch<Action>;
}

const Box: React.FC<BoxProps> = ({ rowData, dispatch, boxIndex, rowIndex }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const tabRef = 100 - (rowIndex * 10 + boxIndex);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const BoxStatus: { [key: string]: string } = {
    blank: 'border border-gray-400',
    active: 'border text-4xl font-medium border-black',
    gray: 'text-4xl font-medium bg-[#787c7e] text-white',
    yellow: 'text-4xl font-medium bg-[#c9b458] text-white',
    green: 'text-4xl font-medium bg-[#6aaa64] text-white',
  };

  let boxStyle = 'flex justify-center items-center w-16 h-16';

  switch (rowData.status) {
    case 'active':
      boxStyle = boxStyle.concat(' ', BoxStatus.active);
      break;
    case 'gray':
      boxStyle = boxStyle.concat(' ', BoxStatus.gray);
      break;
    case 'yellow':
      boxStyle = boxStyle.concat(' ', BoxStatus.yellow);
      break;
    case 'green':
      boxStyle = boxStyle.concat(' ', BoxStatus.green);
      break;
    default:
      boxStyle = boxStyle.concat(' ', BoxStatus.blank);
      break;
  }

  return (
    <div
      className={boxStyle}
      onKeyDown={(e) => {
        if (e.key === 'A') {
          console.log('A!!');
          dispatch({ type: 'input' });
        } else if (e.key === 'Enter') {
          console.log('Enter!!');
          dispatch({ type: 'sent' });
        } else if (e.key === 'Backspace') {
          console.log('Clear!!');
          dispatch({ type: 'clear' });
        }
      }}
      ref={inputRef}
      tabIndex={tabRef}
    >
      {rowData.letter}
    </div>
  );
};

const Row: React.FC<RowProps> = ({ gameData, rowIndex, dispatch }) => {
  return (
    <div className="flex justify-center gap-1.5">
      {gameData.map((data, index) => (
        <Box
          key={`row:${rowIndex}index:${index}`}
          rowIndex={rowIndex}
          boxIndex={index}
          rowData={data}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
};

type Action = { type: 'input' } | { type: 'sent' } | { type: 'clear' };

function reducer(state: Payload, action: Action): Payload {
  switch (action.type) {
    case 'input':
      // TODO: add input logic
      return state;
    case 'sent':
      // TODO: add sent logic
      return state;
    case 'clear':
      // TODO: add clear logic
      return state;
    default:
      return state;
  }
}

interface Payload {
  currentBox: number[];
  data: LetterObject[][];
}

const Game: React.FC = () => {
  const payload: Payload = {
    currentBox: [0, 0],
    data: [
      [
        { status: 'green', letter: 'L' },
        { status: 'gray', letter: 'A' },
        { status: 'blank', letter: '' },
        { status: 'blank', letter: '' },
        { status: 'blank', letter: '' },
      ],
      [
        { status: 'blank', letter: '' },
        { status: 'blank', letter: '' },
        { status: 'blank', letter: '' },
        { status: 'blank', letter: '' },
        { status: 'blank', letter: '' },
      ],
      [
        { status: 'blank', letter: '' },
        { status: 'blank', letter: '' },
        { status: 'blank', letter: '' },
        { status: 'blank', letter: '' },
        { status: 'blank', letter: '' },
      ],
      [
        { status: 'active', letter: 'A' },
        { status: 'blank', letter: '' },
        { status: 'yellow', letter: 'K' },
        { status: 'blank', letter: '' },
        { status: 'blank', letter: '' },
      ],
      [
        { status: 'blank', letter: '' },
        { status: 'blank', letter: '' },
        { status: 'blank', letter: '' },
        { status: 'blank', letter: '' },
        { status: 'blank', letter: '' },
      ],
      [
        { status: 'blank', letter: '' },
        { status: 'blank', letter: '' },
        { status: 'blank', letter: '' },
        { status: 'blank', letter: '' },
        { status: 'blank', letter: '' },
      ],
    ],
  };
  //ToDo
  const [gameState, dispatch] = useReducer(reducer, payload);

  return (
    <div className="flex flex-col gap-1.5 my-60">
      {gameState.data.map((data, index) => (
        <Row key={index} rowIndex={index} gameData={data} dispatch={dispatch} />
      ))}
    </div>
  );
};
export default Game;
