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

export enum DIFFICULTY {
  EASY = 0.2,
  MEDIUM = 0.3,
  HARD = 0.4,
}

export enum SIZE {
  EASY = 6,
  MEDIUM = 10,
  HARD = 20,
}
export interface IPropsGame {
  // mine
  cells: Array<Array<IPropsCell>>;
  cellAt: Function;
  setMines: (excluding: IPropsPoint[]) => void;
  revealMine: (point: IPropsPoint) => void;
  setCellFlag: (point: IPropsPoint) => void;
  calculateNearbyMines: (point: IPropsPoint) => number;
  gameStatus: GameStatus;
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
