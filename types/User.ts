import { DBObject } from "types";
import { Tent } from "./Tent";
import { mybool } from "./mybool";
export interface User extends DBObject {
    tent:Tent
    name:string
    email:string
    role_id:number
    reg_confirm:boolean
    blocked:mybool,
    blocked_reason:string
    test:mybool
    telegram_chat_id:string|null
    reg_token:string|null
}