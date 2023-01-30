import { DBObject, ProductImage } from "types";
import { Product } from "./Product";

export interface PageMeta extends DBObject {
  page:string,
  metatitle:string,
  metadescription:Text,
  title:string,
  description:Text
}
