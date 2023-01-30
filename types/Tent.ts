import { DBObject } from 'types'
import { mybool } from './mybool';
import { TentStyle } from './TentStyle';

export interface Tent extends DBObject {
  user_id: number;
  name: string;
  logo?: string;
  slug: string;
  description?: string;
  active: mybool;
  style_id: number;
  style: TentStyle;
  use_categories: mybool;
  whatsapp?: string;
  whatsapp_area?: string;
  facebook?: string;
  instagram?: string;
  intro_config_done: mybool;
  hide_prices: mybool;
  suspended: mybool;
  repuestos_message: string;
  notification_confirmed:mybool;
  notification_mail:string;
}
