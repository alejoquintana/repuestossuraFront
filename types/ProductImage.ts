import {DBObject} from 'types'
export interface ProductImage extends DBObject {
    product_id : number,
    url:string,
    order:number,
    
}