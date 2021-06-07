import React from "react";
import "./App.css";

function App() {
  const COL = 6;
  const ROW = 6;
  return (
    <div className="App w-full h-full relative flex flex-col justify-center items-center bg-white">
      <RestartBtn />
      <Board>
        {Array(ROW)
          .fill(0)
          .map((x) => Array(COL).fill(0))
          .map((Row) => Row.map((cellData) => <Cell />))}
      </Board>
    </div>
  );
}
const RestartBtn = () => {
  return (
    <div className="restart-btn mb-4 px-4 py-1 rounded-sm ring-1 ring-gray-300 bg-gray-100 cursor-pointer">
      {" "}
      Restart
    </div>
  );
};
const Board = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="board grid grid-cols-6 grid-rows-6 gap-0">{children}</div>
  );
};
const Cell = () => {
  const STATE = ["flag", "cover", "uncover"][Math.floor(Math.random() * 3)];
  const TYPE = ["boom", "non-boom"][Math.floor(Math.random() * 3)];
  return (
    <div
      className={`cell flex justify-center items-center ring-1 ring-gray-300 bg-white rounded-sm w-10 h-10 font-medium ${
        STATE === "cover" || STATE === "flag"
          ? "cursor-pointer"
          : "cursor-default"
      }`}
    >
      {STATE === "cover"
        ? ""
        : STATE === "uncover"
        ? TYPE === "boom"
          ? "💣"
          : Math.floor(Math.random() * 8)
        : "🚩"}
    </div>
  );
};
export default App;
