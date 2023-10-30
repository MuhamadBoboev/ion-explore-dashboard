import { IServiceImage } from '@modules/service/model/serviceImages/IServiceImage'
import { IPagination } from '@shared/model/IPagination'

export interface IService {
  id: number
  name: string
  description: string | null
  image: string
  images: IServiceImage[]
  slug: string
  price: number
  unit: string
  sku: string
}

export interface IServiceData extends IPagination {
  data: IService[]
}
