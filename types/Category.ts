import { DBObject } from 'types'
import { Product } from './Product';

export interface Category extends DBObject {
   code?:string
   name:string
   description?:string 
   slug:string 
   image?:string 
   paused:boolean
   products?:Array<Product>
   order?:number
}