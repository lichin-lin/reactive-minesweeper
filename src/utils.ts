import { IPropsPoint } from "./interface";
import { SIZE, DIFFICULTY } from "./models";

export const generateMine = (
  size: SIZE,
  level: DIFFICULTY,
  excluding: IPropsPoint[]
): IPropsPoint[] => {
  let mineCount = Math.floor(size ** 2 * level);
  let mineArray: IPropsPoint[] = [];

  while (mineArray.length < mineCount) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);
    // try to put in a mine to the list
    const _mine = { x, y };
    const hasMine = (mineArr: IPropsPoint[], newMine: IPropsPoint) =>
      mineArr.some(
        (existMine) => JSON.stringify(existMine) === JSON.stringify(newMine)
      );
    if (!hasMine(mineArray, _mine) && !hasMine(excluding, _mine)) {
      mineArray = [...mineArray, _mine];
    }
  }
  return mineArray;
};
