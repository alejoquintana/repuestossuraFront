import { DBObject } from 'types'
import { mybool } from './mybool';

export interface Location extends DBObject {
    name:string,
    address:string,
    atention:string,
    phone:string,
    map_url:string,
    description:string
}