import { DBObject } from 'types'
import { mybool } from './mybool';

export interface LinktreeLink extends DBObject {
    name:string,
    code:string,
    link:string,
    order:number,
    paused:mybool,
}