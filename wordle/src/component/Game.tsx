import React, { useEffect, useReducer } from 'react';
import Row from './Row';
import { Status, BoxType } from './Type';

const answer: string[] = ['Y', 'I', 'Q', 'U', 'N'];

type GameInfo = {
  gameData: BoxType[][];
  currentIndex: CurrentIndex;
};

type CurrentIndex = {
  row: number;
  box: number;
};

enum ActionType {
  Character,
  Backspace,
  Enter,
}

type Action =
  | {
      type: ActionType.Character;
      payload: string;
    }
  | {
      type: ActionType.Backspace;
    }
  | {
      type: ActionType.Enter;
    };

function reducer(state: GameInfo, action: Action): GameInfo {
  const gameOver =
    state.gameData.find((row) =>
      row.every((box) => box.status === Status.Green)
    ) ||
    state.gameData.every((row) =>
      row.every(
        (box) =>
          box.status === Status.Green ||
          box.status === Status.Gray ||
          box.status === Status.Yellow
      )
    );
  if (gameOver) return state;
  const { gameData } = state;
  const currentIndex = state.currentIndex;
  const newGameData = [...gameData];

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
  function updateArr(index: CurrentIndex, newValue: string) {
    const isClear = newValue === '' ? Status.Blank : Status.Active;
    const rowIndex = index.row;
    const boxIndex = index.box;
    const newArr: BoxType[] = state.gameData[rowIndex].map((letter, index) =>
      index === (newValue === '' ? boxIndex - 1 : boxIndex)
        ? { letter: newValue, status: isClear }
        : letter
    );
    return newArr;
  }

  switch (action.type) {
    case ActionType.Character: {
      if (state.currentIndex.box < 5 && !gameOver) {
        const newValue = action.payload;
        const newRow = updateArr(currentIndex, newValue);
        newGameData[currentIndex.row] = newRow;
        return {
          gameData: newGameData,
          currentIndex: {
            row: currentIndex.row,
            box: currentIndex.box + 1,
          },
        };
      }
      return state;
    }
    case ActionType.Backspace: {
      if (currentIndex.box > 0) {
        const newRow = updateArr(currentIndex, '');
        newGameData[currentIndex.row] = newRow;
        return {
          gameData: newGameData,
          currentIndex: {
            row: currentIndex.row,
            box: currentIndex.box - 1,
          },
        };
      }
      return state;
    }
    case ActionType.Enter: {
      if (currentIndex.box === 5) {
        const checkedRow = checkAnswer(gameData[currentIndex.row]);
        newGameData[currentIndex.row] = checkedRow;
        return {
          gameData: newGameData,
          currentIndex: {
            row: currentIndex.row + 1,
            box: 0,
          },
        };
      }
      return state;
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

  const [game, dispatch] = useReducer(reducer, {
    gameData: initData,
    currentIndex: {
      row: 0,
      box: 0,
    },
  });

  useEffect(() => {
    const handleKeyup = (e: KeyboardEvent) => {
      const ENGLISH_ONLY: RegExp = /^[A-Za-z]{1}$/;
      if (ENGLISH_ONLY.test(e.key)) {
        dispatch({
          type: ActionType.Character,
          payload: e.key.toUpperCase(),
        });
      } else if (e.key === 'Enter') {
        dispatch({
          type: ActionType.Enter,
        });
      } else if (e.key === 'Backspace') {
        dispatch({
          type: ActionType.Backspace,
        });
      }
    };
    window.addEventListener('keyup', handleKeyup);
    return () => window.removeEventListener('keyup', handleKeyup);
  }, []);

  return (
    <div className="flex flex-col gap-1.5 my-60">
      {game.gameData.map((row: BoxType[], index) => (
        <Row key={index} rowContent={row} />
      ))}
    </div>
  );
};
export default Game;
