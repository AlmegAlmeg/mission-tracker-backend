import { ITag } from './Tag';
import { ITimeLog } from './TimeLog';
import { IUser } from './User';

export interface IMission {
  id: string;
  title: string;
  description?: string;
  estimation?: number;
  logs: ITimeLog[];
  tags: ITag[];
  assignedTo?: IUser;
}
