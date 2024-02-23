import { isAfter, isSameDay, parse } from 'date-fns';

export const getCellColor = (value: number) => {
  if (value > 30) return 'var(--blue-5)';
  if (value >= 20 && value <= 29) return 'var(--blue-4)';
  if (value >= 10 && value <= 19) return 'var(--blue-3)';
  if (value >= 1 && value <= 9) return 'var(--blue-2)';
  return '';
};

export const isFirstDateAfterSecondDate = (date1: Date, date2: Date) => {
  if (isAfter(date1, date2) || isSameDay(date1, date2)) {
    return true;
  }
  return false;
};

export const parseDatetime = (date: string) => {
  return parse(date, 'yyyy-MM-dd', new Date());
};

export const getFirstLetterCapital = (string: string | undefined) => {
  if (string) return string[0].toUpperCase() + string.slice(1);
  return '';
};

export const getContributionsMessage = (number: number | undefined) => {
  if (number) return `${number} contributions`;
  return '';
};

export const getClassName = (row: number, col: number, select: number[]) => {
  const [iniRow, iniCol] = select;

  if (row === iniRow && col === iniCol) {
    return 'Selected';
  }
};

export const getOpenStatus = (row: number, col: number, select: number[]) => {
  const [iniRow, iniCol] = select;

  if (row === iniRow && col === iniCol) {
    return true;
  }
  return false;
};

export const handleMouseDown = (
  _e: React.MouseEvent,
  row: number,
  col: number,
  select: number[],
  setSelect: (value: React.SetStateAction<number[]>) => void,
) => {
  const [iniRow, iniCol] = select;

  if (row === iniRow && col === iniCol) {
    return setSelect([-1, -1]);
  }
  setSelect([row, col]);
};
