import { Types } from 'mongoose';

// import { ITimeLog } from './TimeLog';
export interface IUser {
  _id: Types.ObjectId;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  role: 'Admin' | 'Moderator' | 'Developer' | 'Project Manager';
  timeLogs: Types.ObjectId[];
}
