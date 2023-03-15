import React, { useEffect, useRef, useReducer, useState } from 'react';
import Row from './Row';

const answer: string[] = ['S', 'M', 'I', 'L', 'E'];

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

type CurrentIndex = {
  rowIndex: number;
  letterIndex: number;
};

enum ActionType {
  Input,
  Clear,
  Sent,
}

type Action =
  | {
      type: ActionType.Input;
      payload: { value: string; current: CurrentIndex };
    }
  | {
      type: ActionType.Clear;
      payload: CurrentIndex;
    }
  | {
      type: ActionType.Sent;
      payload: { currentRow: BoxType[]; reset: BoxType[] };
    };

function reducer(state: BoxType[], action: Action): BoxType[] {
  function upDateArr(current: CurrentIndex, newValue: string) {
    const isClear = newValue === '' ? Status.Blank : Status.Active;
    const newArr: BoxType[] = state.map((letter, index) =>
      index ===
      (newValue === '' ? current.letterIndex - 1 : current.letterIndex)
        ? { letter: newValue, status: isClear }
        : letter
    );
    return newArr;
  }

  switch (action.type) {
    case ActionType.Input: {
      const current = action.payload.current;
      const newValue = action.payload.value;
      return upDateArr(current, newValue);
    }
    case ActionType.Clear: {
      const current = action.payload;
      return upDateArr(current, '');
    }
    case ActionType.Sent: {
      return action.payload.reset;
    }
    default:
      throw new Error();
  }
}

const Game: React.FC = () => {
  const initData: BoxType[][] = [
    [
      { status: Status.Blank, letter: '' },
      { status: Status.Blank, letter: '' },
      { status: Status.Blank, letter: '' },
      { status: Status.Blank, letter: '' },
      { status: Status.Blank, letter: '' },
    ],
    [
      { status: Status.Blank, letter: '' },
      { status: Status.Blank, letter: '' },
      { status: Status.Blank, letter: '' },
      { status: Status.Blank, letter: '' },
      { status: Status.Blank, letter: '' },
    ],
    [
      { status: Status.Blank, letter: '' },
      { status: Status.Blank, letter: '' },
      { status: Status.Blank, letter: '' },
      { status: Status.Blank, letter: '' },
      { status: Status.Blank, letter: '' },
    ],
    [
      { status: Status.Blank, letter: '' },
      { status: Status.Blank, letter: '' },
      { status: Status.Blank, letter: '' },
      { status: Status.Blank, letter: '' },
      { status: Status.Blank, letter: '' },
    ],
    [
      { status: Status.Blank, letter: '' },
      { status: Status.Blank, letter: '' },
      { status: Status.Blank, letter: '' },
      { status: Status.Blank, letter: '' },
      { status: Status.Blank, letter: '' },
    ],
    [
      { status: Status.Blank, letter: '' },
      { status: Status.Blank, letter: '' },
      { status: Status.Blank, letter: '' },
      { status: Status.Blank, letter: '' },
      { status: Status.Blank, letter: '' },
    ],
  ];
  const [currentIndex, setCurrentIndex] = useState<CurrentIndex>({
    rowIndex: 0,
    letterIndex: 0,
  });
  const [guessMap, setGuessMap] = useState<BoxType[][]>(initData);
  const [currentRow, dispatch] = useReducer(reducer, initData[0]);
  const isWin = useRef<boolean>(false);

  function checkAnswer(currentRow: BoxType[]): BoxType[] {
    const statusArray: Status[] = currentRow.map((box, index): Status => {
      if (box.letter === answer[index]) {
        return Status.Green;
      } else if (answer.includes(box.letter)) {
        return Status.Yellow;
      }
      return Status.Gray;
    });
    const checkedRow: BoxType[] = currentRow.map((box, index): BoxType => {
      return { letter: box.letter, status: statusArray[index] };
    });
    return checkedRow;
  }

  useEffect(() => {
    const handleKeyup = (e: KeyboardEvent) => {
      const regex: RegExp = /^[A-Za-z]{1}$/;
      if (regex.test(e.key) && currentIndex.letterIndex < 5 && !isWin.current) {
        dispatch({
          type: ActionType.Input,
          payload: {
            value: e.key.toUpperCase(),
            current: currentIndex,
          },
        });
        setCurrentIndex({
          ...currentIndex,
          letterIndex: currentIndex.letterIndex + 1,
        });
      } else if (e.key === 'Enter' && currentIndex.letterIndex === 5) {
        const checkedRow = checkAnswer(currentRow);
        setCurrentIndex({
          rowIndex: currentIndex.rowIndex + 1,
          letterIndex: 0,
        });
        dispatch({
          type: ActionType.Sent,
          payload: { currentRow: currentRow, reset: initData[0] },
        });
        setGuessMap(
          guessMap.map((row, index) =>
            index === currentIndex.rowIndex ? checkedRow : row
          )
        );
        if (
          checkedRow.every(
            (letterObject: BoxType): boolean =>
              letterObject.status === Status.Green
          )
        ) {
          isWin.current = true;
        }
      } else if (e.key === 'Backspace' && currentIndex.letterIndex >= 0) {
        dispatch({
          type: ActionType.Clear,
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
