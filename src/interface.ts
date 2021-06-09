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
  revealMine: (point: IPropsPoint) => void;
  setCellFlag: (point: IPropsPoint) => void;
  calculateNearbyMines: (point: IPropsPoint) => number;
  gameStatus: GameStatus
  reset: Function;
}
export interface IPropsCell {
  isMine: boolean;
  nearbyMines: number | null;
  status: CellStatus;
  // TODO: should this be optional?
  toggleFlag?: Function;
}

export interface IPropsPoint {
  x: number;
  y: number;
}
