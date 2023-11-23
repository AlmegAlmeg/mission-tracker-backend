import { IMission } from "./Mission";

export interface ICollection {
  id: string;
  title: string;
  missions: IMission[]
}