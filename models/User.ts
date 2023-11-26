import { ITimeLog } from './TimeLog';
export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  role: 'Admin' | 'Moderator' | 'Developer' | 'Project Manager';
  timeLogs: ITimeLog[];
}
