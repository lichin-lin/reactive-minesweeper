import { makeAutoObservable, autorun, toJS } from "mobx";
import {
  IPropsGame,
  IPropsCell,
  IPropsPoint,
  CellStatus,
  GameStatus,
  SIZE,
  DIFFICULTY,
} from "./interface";
import { generateMine } from "./utils";

export class Game implements IPropsGame {
  cells: Array<Array<Cell>>;
  size: SIZE;
  secondsPassed: number = 0;

  constructor(size: SIZE, level: DIFFICULTY) {
    this.cells = this.initBoard(size);
    this.size = size;
    makeAutoObservable(this);
    autorun(() => {
      // console.log(toJS(this));
    });
  }
  initBoard(size: SIZE) {
    return Array(size)
      .fill(0)
      .map((y) => Array(size).fill(0))
      .map((Row) => Row.map((cell, id) => new Cell()));
  }
  setMines(excluding: IPropsPoint[]) {
    const mines = generateMine(this.size, DIFFICULTY.EASY, excluding);
    mines.forEach((mine) => {
      const { x, y } = mine;
      this.cells[x][y].isMine = true;
    });
  }
  setCellFlag(point: IPropsPoint) {
    const { x, y } = point;
    const cellStatus = this.cells[x][y].status;
    if (cellStatus === CellStatus.flag || cellStatus === CellStatus.hide) {
      this.cells[x][y].toggleFlag();
    }
  }
  revealMine(point: IPropsPoint) {
    if (this.gameStatus === GameStatus.IDLE) {
      this.setMines([point]);
    }
    if (
      this.gameStatus === GameStatus.WON ||
      this.gameStatus === GameStatus.LOST
    ) {
      return;
    }
    const { x, y } = point;
    if (this.cells[x][y].status === CellStatus.hide) {
      this.revealMineRecusivly(point);
    }
  }
  reset() {
    this.cells = this.initBoard(this.size);
  }
  get gameStatus() {
    let _gameStatus = GameStatus.IDLE;
    const allMines = this.cells.flat(1);
    if (
      // some reveal and isMine -> Lost
      allMines.some((cell) => cell.isMine && cell.status === CellStatus.show)
    ) {
      _gameStatus = GameStatus.LOST;
    } else if (
      // other than bomb's mines all got reveal / flagged -> Win
      allMines.filter((cell) => !cell.isMine && cell.status === CellStatus.show)
        .length ===
      allMines.length - allMines.filter((cell) => cell.isMine).length
    ) {
      _gameStatus = GameStatus.WON;
    } else if (
      allMines.some((cell) => cell.isMine) // fist one click, bomb set -> Playing
    ) {
      _gameStatus = GameStatus.PLAYING;
    }
    return _gameStatus;
  }
  calculateNearbyMines(point: IPropsPoint) {
    const nearbyMineCount = this.getNearbyCells(point).filter(
      (cell: IPropsCell) => cell?.isMine
    ).length;
    return nearbyMineCount;
  }
  getNearbyCells(point: IPropsPoint) {
    return this.cellsMatrix(point)
      .map((cellIndex) => this.cells?.[cellIndex[0]]?.[cellIndex[1]])
      .filter((Cell: IPropsCell) => Cell !== undefined);
  }
  revealMineRecusivly(point: IPropsPoint) {
    const { x, y } = point;
    if (this.cells[x][y].status === CellStatus.hide) {
      const nearbyMinesCount = this.calculateNearbyMines(point);
      this.cells[x][y].nearbyMines = nearbyMinesCount;
      this.cells[x][y].status = CellStatus.show;
      if (nearbyMinesCount === 0 && !this.cells[x][y].isMine) {
        this.cellsMatrix(point)
          .filter(
            (cellIndex) =>
              this.cells?.[cellIndex[0]]?.[cellIndex[1]]?.status ===
              CellStatus.hide
          )
          .forEach((cellIndex) =>
            this.revealMineRecusivly({ x: cellIndex[0], y: cellIndex[1] })
          );
      }
    }
  }
  cellsMatrix = (point: IPropsPoint) => {
    const { x, y } = point;
    return [
      // upper row
      [x - 1, y - 1],
      [x, y - 1],
      [x + 1, y - 1],
      // same row
      [x - 1, y],
      [x + 1, y],
      // down row
      [x - 1, y + 1],
      [x, y + 1],
      [x + 1, y + 1],
    ];
  };
}

export class Cell implements IPropsCell {
  status: CellStatus = CellStatus.hide;
  isMine: boolean = false;
  nearbyMines: number | null = 0;

  constructor() {
    makeAutoObservable(this);
  }

  toggleFlag() {
    this.status =
      this.status === CellStatus.hide ? CellStatus.flag : CellStatus.hide;
  }
}
