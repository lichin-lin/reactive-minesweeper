import { makeAutoObservable, autorun, toJS } from "mobx";
import { IPropsGame, IPropsCell } from "./interface";
import { generateMine } from "./utils";

export enum GameState {
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

export class Game implements IPropsGame {
  cells: Array<Array<Cell>>;
  secondsPassed: number = 0;

  constructor(size: SIZE, level: DIFFICULTY) {
    makeAutoObservable(this);
    this.cells = this.initBoard(size);
    autorun(() => console.log(toJS(this)));
  }
  initBoard(size: SIZE) {
    return Array(size)
      .fill(0)
      .map((x) => Array(size).fill(0))
      .map((Row) => Row.map((cell, id) => new Cell()));
  }
  setMines() {
    const mines = generateMine(SIZE.EASY, DIFFICULTY.EASY);
    mines.forEach((mine) => {
      this.cells[mine[0]][mine[1]].isMine = true;
      console.log(this.cells[mine[0]][mine[1]]);
    });
  }
  cellAt(x: number, y: number): IPropsCell {
    return this.cells[x][y];
  }

  increase() {
    this.secondsPassed += 1;
  }
  reset() {
    this.secondsPassed = 0;
    this.cells = this.initBoard(SIZE.EASY);
  }
}

export class Cell implements IPropsCell {
  isMine: boolean = false;
  nearbyMines: number | null = null;

  constructor() {
    makeAutoObservable(this);
  }
}
