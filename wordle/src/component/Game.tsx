import React, { useEffect, useRef, useReducer, useState } from 'react';

type Status = 'active' | 'gray' | 'yellow' | 'green' | 'blank';

interface LetterType {
  status: Status;
  letter: string;
}

interface RowProps {
  rowContent: LetterType[];
}

interface BoxProps {
  letterObject: LetterType;
}

type Action =
  | {
      type: 'input';
      payload: { value: string; current: CurrentObject };
    }
  | {
      type: 'clear';
      payload: CurrentObject;
    }
  | { type: 'sent'; payload: LetterType[] };

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

  return <div className={boxStyle}>{letterObject.letter}</div>;
};

const Row: React.FC<RowProps> = ({ rowContent }) => {
  return (
    <div className="flex justify-center gap-1.5">
      {rowContent.map((box: LetterType, index) => (
        <Box key={index} letterObject={box} />
      ))}
    </div>
  );
};

function reducer(state: LetterType[], action: Action): LetterType[] {
  switch (action.type) {
    case 'input': {
      const current = action.payload.current;
      const newArr: LetterType[] = state.map((letterObject, index) =>
        index === current.letterIndex
          ? { letter: action.payload.value, status: 'active' }
          : letterObject
      );
      return newArr;
    }
    case 'clear': {
      const current = action.payload;
      const newArr: LetterType[] = state.map((letterObject, index) =>
        index === current.letterIndex - 1
          ? { letter: '', status: 'blank' }
          : letterObject
      );
      return newArr;
    }
    case 'sent': {
      return action.payload;
    }
    default:
      throw new Error();
  }
}

type CurrentObject = {
  rowIndex: number;
  letterIndex: number;
};

const Game: React.FC = () => {
  const initData: LetterType[][] = [
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
  ];
  const [current, setCurrent] = useState<CurrentObject>({
    rowIndex: 0,
    letterIndex: 0,
  });
  const [guessMap, setGuessMap] = useState<LetterType[][]>(initData);
  const [currentRow, dispatch] = useReducer(reducer, initData[0]);
  const answerRow = useRef<LetterType[]>(initData[0]);
  const isWin = useRef<boolean>(false);
  const answer: string[] = ['S', 'M', 'I', 'L', 'E'];

  useEffect(() => {
    const handleKeyIn: any = (e: KeyboardEvent) => {
      const regex: RegExp = /^[A-Za-z]{1}$/;
      if (regex.test(e.key) && current.letterIndex < 5 && !isWin.current) {
        dispatch({
          type: 'input',
          payload: {
            value: e.key.toUpperCase(),
            current: current,
          },
        });
        setCurrent({ ...current, letterIndex: current.letterIndex + 1 });
        if (current.letterIndex === 4) {
          answerRow.current = checkAnswer(
            currentRow,
            e.key.toUpperCase(),
            answer
          );
        }
      } else if (e.key === 'Backspace' && current.letterIndex > 0) {
        dispatch({
          type: 'clear',
          payload: current,
        });
        setCurrent({ ...current, letterIndex: current.letterIndex - 1 });
      } else if (e.key === 'Enter' && current.letterIndex === 5) {
        setCurrent({ rowIndex: current.rowIndex + 1, letterIndex: 0 });
        setGuessMap(
          guessMap.map((row, index) =>
            index === current.rowIndex ? answerRow.current : row
          )
        );
        dispatch({
          type: 'sent',
          payload: initData[0],
        });
        if (
          answerRow.current.every(
            (letterObject: LetterType): boolean =>
              letterObject.status === 'green'
          )
        ) {
          isWin.current = true;
        }
      }
    };
    window.addEventListener('keyup', handleKeyIn);
    return () => window.removeEventListener('keyup', handleKeyIn);
  }, [current]);

  function checkAnswer(
    guessing: LetterType[],
    currentInput: string,
    answer: string[]
  ): LetterType[] {
    const guessingLetters: string[] = [
      ...guessing
        .map((letterObject: LetterType): string => letterObject.letter)
        .slice(0, 4),
      currentInput,
    ];
    const statusArray: Status[] = guessingLetters.map(
      (letter, index): Status => {
        if (letter === answer[index]) {
          return 'green';
        } else if (answer.includes(letter)) {
          return 'yellow';
        }
        return 'gray';
      }
    );
    const checkedRow: LetterType[] = guessingLetters.map(
      (letter, index): LetterType => {
        return { letter: letter, status: statusArray[index] };
      }
    );
    return checkedRow;
  }

  return (
    <div className="flex flex-col gap-1.5 my-60">
      {guessMap.map((row: LetterType[], index) => (
        <Row
          key={index}
          rowContent={index === current.rowIndex ? currentRow : row}
        />
      ))}
    </div>
  );
};
export default Game;
