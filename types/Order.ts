import { DBObject, OrderStatus } from "types";
import { mybool } from "./mybool";

export interface Order extends DBObject {
    user_id: number
    email: string
    phone: string
    total: number
    status: OrderStatus
    city_id: number
    shipping: number
    address: string
    transport: string
    cp: string
    viewed: mybool
    cancelation: string
    viewed_at: Date
    phone_code: string
    seller: string
    client: string
    comments: string
    phone_area: string
    whatsapp: number
    message: string
    edited: number
    source: string
    name: string
    city: string
    deleted_at: Date
    order_items:Array<any>
}