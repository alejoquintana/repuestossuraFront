import { DBObject } from 'types'
import { Product } from './Product';
import { mybool } from './mybool';

export interface AppImage extends DBObject {
    code:string,
    name:string,
    target_url:string,
    alt:string,
    url:string,
    paused:mybool,
    all_pages:mybool
}