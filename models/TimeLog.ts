import { ITag } from './Tag';
import { IUser } from './User';

export interface ITimeLog {
  id: string;
  time: number;
  createdBy: IUser;
  createdAt: Date;
  tag: ITag;
}
