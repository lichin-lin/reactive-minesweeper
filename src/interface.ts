export interface IPropsGame {
  // mine
  cells: Array<Array<IPropsCell>>;
  cellAt: Function;
  setMines: (excluding: IPropsPoint[]) => void;
  // timer
  secondsPassed: number;
  increase: Function;
  reset: Function;
}
export interface IPropsCell {
  isMine: boolean;
  nearbyMines: number | null;
}


export interface IPropsPoint {
  x: number;
  y: number;
}