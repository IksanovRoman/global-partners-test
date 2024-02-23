export interface DataInterface {
  [key: string]: number;
}

export interface DateWithMonthsInterface {
  date: string;
  month: string;
  contribution: ContributionInterface[];
}

export interface ContributionInterface {
  date: string;
  day: string;
  value: number;
  dateForHover: string;
}

export interface GroupedArrayInterface {
  [key: string]: ContributionInterface[];
}
