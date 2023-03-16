import React, { useEffect, useRef, useReducer, useState } from 'react';
import Row from './Row';
import { Status, BoxType } from './Type';

const answer: string[] = ['Y', 'I', 'Q', 'U', 'N'];

type CurrentIndex = {
  rowIndex: number;
  boxIndex: number;
};

enum ActionType {
  Character,
  Backspace,
  Enter,
}

type Action =
  | {
      type: ActionType.Character;
      payload: { value: string; current: CurrentIndex };
    }
  | {
      type: ActionType.Backspace;
      payload: CurrentIndex;
    }
  | {
      type: ActionType.Enter;
      payload: { currentRow: BoxType[]; reset: BoxType[] };
    };

function reducer(state: BoxType[], action: Action): BoxType[] {
  function upDateArr(current: CurrentIndex, newValue: string) {
    const isClear = newValue === '' ? Status.Blank : Status.Active;
    const newArr: BoxType[] = state.map((letter, index) =>
      index === (newValue === '' ? current.boxIndex - 1 : current.boxIndex)
        ? { letter: newValue, status: isClear }
        : letter
    );
    return newArr;
  }

  switch (action.type) {
    case ActionType.Character: {
      const { current, value: newValue } = action.payload;
      return upDateArr(current, newValue);
    }
    case ActionType.Backspace: {
      const current = action.payload;
      return upDateArr(current, '');
    }
    case ActionType.Enter: {
      return action.payload.reset;
    }
    default:
      throw new Error();
  }
}

const Game: React.FC = () => {
  const initData: BoxType[][] = new Array(6).fill(
    new Array(5).fill({
      letter: '',
      status: Status.Blank,
    })
  );

  const [currentIndex, setCurrentIndex] = useState<CurrentIndex>({
    rowIndex: 0,
    boxIndex: 0,
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
      if (regex.test(e.key) && currentIndex.boxIndex < 5 && !isWin.current) {
        dispatch({
          type: ActionType.Character,
          payload: {
            value: e.key.toUpperCase(),
            current: currentIndex,
          },
        });
        setCurrentIndex({
          ...currentIndex,
          boxIndex: currentIndex.boxIndex + 1,
        });
      } else if (e.key === 'Enter' && currentIndex.boxIndex === 5) {
        const checkedRow = checkAnswer(currentRow);
        setCurrentIndex({
          rowIndex: currentIndex.rowIndex + 1,
          boxIndex: 0,
        });
        dispatch({
          type: ActionType.Enter,
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
      } else if (e.key === 'Backspace' && currentIndex.boxIndex >= 0) {
        dispatch({
          type: ActionType.Backspace,
          payload: currentIndex,
        });
        setCurrentIndex({
          ...currentIndex,
          boxIndex: currentIndex.boxIndex - 1,
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
