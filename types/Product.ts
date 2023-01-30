import { DBObject, ProductImage, CarModel } from 'types'

export interface Product extends DBObject {
    originalPrice:number
    price:number
    slug: string
    category_id:number
    name :string
    code :string
    description:string
    paused:boolean
    offer:boolean
    new:boolean
    stock:string
    images:Array<ProductImage>
	car_models:Array<CarModel>
}
