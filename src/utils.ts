import { SIZE, DIFFICULTY, IPropsPoint } from "./interface";

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
    const hasMine = (newMine: IPropsPoint) => (existMine: IPropsPoint) =>
      JSON.stringify(newMine) === JSON.stringify(existMine);
    const _mine = { x, y };
    if (!mineArray.find(hasMine(_mine)) && !excluding.find(hasMine(_mine))) {
      mineArray = [...mineArray, _mine];
    }
  }
  return mineArray;
};
