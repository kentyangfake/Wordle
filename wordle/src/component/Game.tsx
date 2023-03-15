import React, { useEffect, useRef, useReducer, useState } from 'react';
import Row from './Row';

const answer: string[] = ['S', 'M', 'I', 'L', 'E'];

type Status = 'active' | 'gray' | 'yellow' | 'green' | 'blank';

interface BoxType {
  status: Status;
  letter: string;
}

type CurrentIndex = {
  rowIndex: number;
  letterIndex: number;
};

type Action =
  | {
      type: 'input';
      payload: { value: string; current: CurrentIndex };
    }
  | {
      type: 'clear';
      payload: CurrentIndex;
    }
  | { type: 'sent'; payload: BoxType[] };

function reducer(state: BoxType[], action: Action): BoxType[] {
  function upDateArr(current: CurrentIndex, newValue: string) {
    const isClear = newValue === '' ? 'blank' : 'active';
    const newArr: BoxType[] = state.map((letter, index) =>
      index ===
      (newValue === '' ? current.letterIndex - 1 : current.letterIndex)
        ? { letter: newValue, status: isClear }
        : letter
    );
    return newArr;
  }

  switch (action.type) {
    case 'input': {
      const current = action.payload.current;
      const newValue = action.payload.value;
      return upDateArr(current, newValue);
    }
    case 'clear': {
      const current = action.payload;
      return upDateArr(current, '');
    }
    case 'sent': {
      return action.payload;
    }
    default:
      throw new Error();
  }
}

const Game: React.FC = () => {
  const initData: BoxType[][] = [
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
  const [currentIndex, setCurrentIndex] = useState<CurrentIndex>({
    rowIndex: 0,
    letterIndex: 0,
  });
  const [guessMap, setGuessMap] = useState<BoxType[][]>(initData);
  const [currentRow, dispatch] = useReducer(reducer, initData[0]);
  const answerRow = useRef<BoxType[]>(initData[0]);
  const isWin = useRef<boolean>(false);
  console.log(currentRow);

  useEffect(() => {
    const handleKeyup = (e: KeyboardEvent) => {
      const regex: RegExp = /^[A-Za-z]{1}$/;
      if (regex.test(e.key) && currentIndex.letterIndex < 5 && !isWin.current) {
        dispatch({
          type: 'input',
          payload: {
            value: e.key.toUpperCase(),
            current: currentIndex,
          },
        });
        setCurrentIndex({
          ...currentIndex,
          letterIndex: currentIndex.letterIndex + 1,
        });
        if (currentIndex.letterIndex === 4) {
          answerRow.current = checkAnswer(
            currentRow,
            e.key.toUpperCase(),
            answer
          );
        }
      } else if (e.key === 'Enter' && currentIndex.letterIndex === 5) {
        setCurrentIndex({
          rowIndex: currentIndex.rowIndex + 1,
          letterIndex: 0,
        });
        setGuessMap(
          guessMap.map((row, index) =>
            index === currentIndex.rowIndex ? answerRow.current : row
          )
        );
        dispatch({
          type: 'sent',
          payload: initData[0],
        });
        if (
          answerRow.current.every(
            (letterObject: BoxType): boolean => letterObject.status === 'green'
          )
        ) {
          isWin.current = true;
        }
      } else if (e.key === 'Backspace' && currentIndex.letterIndex >= 0) {
        dispatch({
          type: 'clear',
          payload: currentIndex,
        });
        setCurrentIndex({
          ...currentIndex,
          letterIndex: currentIndex.letterIndex - 1,
        });
      }
    };
    window.addEventListener('keyup', handleKeyup);
    return () => window.removeEventListener('keyup', handleKeyup);
  }, [currentIndex]);

  function checkAnswer(
    guessing: BoxType[],
    currentInput: string,
    answer: string[]
  ): BoxType[] {
    const guessingLetters: string[] = [
      ...guessing
        .map((letterObject: BoxType): string => letterObject.letter)
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
    const checkedRow: BoxType[] = guessingLetters.map(
      (letter, index): BoxType => {
        return { letter: letter, status: statusArray[index] };
      }
    );
    return checkedRow;
  }

  return (
    <div className="flex flex-col gap-1.5 my-60">
      {guessMap.map((row: BoxType[], index) => (
        <Row
          key={index}
          rowContent={index === currentIndex.rowIndex ? currentRow : row}
        />
      ))}
    </div>
  );
};
export default Game;
