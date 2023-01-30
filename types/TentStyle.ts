import { DBObject } from "types";

export interface TentStyle extends DBObject {
  name:string;
  component_name:string;
  image:string;
  description:string;
}
