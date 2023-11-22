import { IServiceImage } from '@modules/service/model/serviceImages/IServiceImage'
import { IPagination } from '@shared/model/IPagination'

export interface IService {
  id: number
  name: string
  lang_id: number
  icon: string
}

// export interface IServiceData extends IPagination {
//   data: IService[]
// }
