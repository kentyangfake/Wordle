export enum Status {
  Active,
  Gray,
  Yellow,
  Green,
  Blank,
}

export interface BoxType {
  status: Status;
  letter: string;
}
