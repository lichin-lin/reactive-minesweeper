import { makeAutoObservable, autorun, toJS } from "mobx";
import {
  IPropsGame,
  IPropsCell,
  IPropsPoint,
  CellStatus,
  GameStatus,
} from "./interface";
import { generateMine } from "./utils";

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

export class Game implements IPropsGame {
  cells: Array<Array<Cell>>;
  secondsPassed: number = 0;

  constructor(size: SIZE, level: DIFFICULTY) {
    this.cells = this.initBoard(size);
    makeAutoObservable(this);
    autorun(() => {
      console.log(toJS(this));
    });
  }
  initBoard(size: SIZE) {
    return Array(size)
      .fill(0)
      .map((y) => Array(size).fill(0))
      .map((Row) => Row.map((cell, id) => new Cell()));
  }
  setMines(excluding: IPropsPoint[]) {
    const mines = generateMine(SIZE.EASY, DIFFICULTY.EASY, excluding);
    mines.forEach((mine) => {
      const { x, y } = mine;
      this.cells[x][y].isMine = true;
    });
  }
  setCellFlag(point: IPropsPoint) {
    const { x, y } = point;
    if (
      this.cells[x][y].status === CellStatus.flag ||
      this.cells[x][y].status === CellStatus.hide
    ) {
      this.cells[x][y].toggleFlag();
    }
  }
  cellAt(point: IPropsPoint): IPropsCell {
    const { x, y } = point;
    return this.cells[x][y];
  }
  revealMine(point: IPropsPoint) {
    if (this.gameStatus === GameStatus.IDLE) {
      this.setMines([point]);
    }
    const { x, y } = point;
    if (this.cells[x][y].status === CellStatus.hide) {
      this.cells[x][y].status = CellStatus.show;
      this.cells[x][y].nearbyMines = this.calculateNearbyMines({ x, y });
    }
  }
  reset() {
    this.cells = this.initBoard(SIZE.EASY);
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
      allMines.filter(
        (cell) =>
          !cell.isMine &&
          (cell.status === CellStatus.show || cell.status === CellStatus.flag)
      ).length +
        allMines.filter(
          (cell) => cell.isMine && cell.status === CellStatus.hide
        ).length ===
      allMines.length
    ) {
      _gameStatus = GameStatus.WON;
    } else if (
      // fist one click, bomb set -> Playing
      this.cells.flat(1).some((cell) => cell.isMine)
    ) {
      _gameStatus = GameStatus.PLAYING;
    }
    return _gameStatus;
  }
  calculateNearbyMines(point: IPropsPoint) {
    const { x, y } = point;
    const nearbyMineCount = [
      // upper row
      this.cells?.[x - 1]?.[y - 1],
      this.cells?.[x]?.[y - 1],
      this.cells?.[x + 1]?.[y - 1],
      // same row
      this.cells?.[x - 1]?.[y],
      this.cells?.[x + 1]?.[y],
      // down row
      this.cells?.[x - 1]?.[y + 1],
      this.cells?.[x]?.[y + 1],
      this.cells?.[x + 1]?.[y + 1],
    ]
      // TODO: remove outbound warning
      .map((cell: IPropsCell) => cell?.isMine)
      .filter(Boolean).length;
    return nearbyMineCount;
  }
  // TODO: Reveal recursivly
  // TODO: flag & flag back
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
