export enum CellStatus {
  hide,
  show,
  flag,
}
export enum GameStatus {
  IDLE,
  PLAYING,
  LOST,
  WON,
}
export interface IPropsGame {
  // mine
  cells: Array<Array<IPropsCell>>;
  cellAt: Function;
  setMines: (excluding: IPropsPoint[]) => void;
  gameStatus: GameStatus
  reset: Function;
}
export interface IPropsCell {
  isMine: boolean;
  nearbyMines: number | null;
  status: CellStatus;
}

export interface IPropsPoint {
  x: number;
  y: number;
}
