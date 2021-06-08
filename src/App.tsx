import React from "react";
import { observer } from "mobx-react";
import { IPropsCell, IPropsGame, CellStatus, GameStatus } from "./interface";
import "./App.css";

const App = observer(({ gameState }: { gameState: IPropsGame }) => {
  const MapGameStatus = (gameStatus: GameStatus) => {
    switch (gameStatus) {
      case GameStatus.IDLE:
        return "Ready for playing";
      case GameStatus.PLAYING:
        return "Playing...";
      case GameStatus.LOST:
        return "Oh, try again 😢";
      case GameStatus.WON:
        return "Congrats! ✨";
      default:
        break;
    }
  };
  return (
    <div className="app w-full h-full relative flex flex-col justify-center items-center bg-white">
      <RestartBtn gameState={gameState} />
      <div className="gameStatus text-xs mb-2 font-bold">
        {MapGameStatus(gameState.gameStatus)}
      </div>
      <Board>
        {gameState.cells.map((cellRow, x) =>
          cellRow.map((cell, y) => (
            <Cell
              key={`${x}-${y}`}
              data={{
                isMine: cell.isMine,
                nearbyMines: cell.nearbyMines,
                status: cell.status,
              }}
              clickBlock={() => gameState.setMines([{ x, y }])}
            />
          ))
        )}
      </Board>
    </div>
  );
});

const RestartBtn = ({ gameState }: { gameState: IPropsGame }) => {
  return (
    <div
      className="restart-btn mb-4 px-4 py-1 rounded-sm ring-1 ring-gray-300 bg-gray-100 cursor-pointer"
      onClick={() => gameState.reset()}
    >
      Restart
    </div>
  );
};

const Board = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="board grid grid-cols-6 grid-rows-6 gap-0">{children}</div>
  );
};

const Cell = ({
  data,
  clickBlock,
}: {
  data: IPropsCell;
  clickBlock: Function;
}) => {
  const { status } = data;  
  return (
    <div
      className={`cell flex justify-center items-center ring-1 ring-gray-300 bg-white rounded-sm w-10 h-10 font-medium ${
        status === CellStatus.hide || status === CellStatus.flag
          ? "cursor-pointer"
          : "cursor-default"
      }`}
      onClick={() => {
        if (status === CellStatus.hide) {
          console.log("on click");
          clickBlock();
        }
      }}
    >
      {status === CellStatus.hide
        ? ""
        : status === CellStatus.show
        ? data.isMine
          ? "💣"
          : data.nearbyMines
        : "🚩"}
    </div>
  );
};
export default App;
