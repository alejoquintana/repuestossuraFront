import { DBObject,ProductImage } from 'types'
import { mybool } from './mybool';

export interface RetiroOption extends DBObject {
    code:string,
    name:string,
    description:string,
    active:mybool
}