import { DBObject } from 'types'

export interface CarModel extends DBObject {
   code?:string
   name:string
	car_brand_id:number
}
