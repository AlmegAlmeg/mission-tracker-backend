import { ICollection } from './Collection';

export interface IProject {
  id: string;
  name: string;
  slug?: string;
  collections: ICollection[];
}
