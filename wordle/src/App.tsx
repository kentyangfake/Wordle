import React from 'react';
import Game from './component/Game';

const App: React.FC = () => {
  return (
    <div className="flex-col w-screen">
      <h1 className="text-3xl text-center p-3 h-16 font-bold">
      Wordle
      </h1>
      <hr></hr>
      <Game />
    </div>
  );
}

export default App;
