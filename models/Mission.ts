import { ITag } from "./Tag";
import { ITimeLog } from "./TimeLog";

export interface IMission {
  id: string;
  title: string;
  description: string;
  estimation: number;
  logs: ITimeLog[];
  tags: ITag[];
}
