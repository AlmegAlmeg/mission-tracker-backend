import { IUser } from "./User";

export interface ITimeLog {
  id: string;
  time: number;
  createdBy: IUser;
  createdAt: Date;
}
