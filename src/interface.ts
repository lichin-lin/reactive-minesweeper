export interface IPropsGame {
  // mine
  cells: Array<Array<IPropsCell>>;
  cellAt: Function;
  setMines: Function;
  // timer
  secondsPassed: number;
  increase: Function;
  reset: Function;
}
export interface IPropsCell {
  isMine: boolean;
  nearbyMines: number | null;
}
