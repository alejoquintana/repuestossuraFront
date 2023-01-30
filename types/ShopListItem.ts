import { Product } from './index'

export class ShopListItem {
    product= {} as Product 
    units=0 as number
    constructor( product:Product, units:number ){
        this.units = units;
        this.product =product;
    }
    subtotal():number{
        let product = this.product as Product ;
        return product.price * this.units;
    }
}