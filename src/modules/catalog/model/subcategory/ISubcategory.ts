import { IService } from '@modules/service'

export interface ISubcategory {
  id: number
  name: string
  description: string | null
  slug: string
  icon: string
  category_id: number
  services: IService[]
  order: number | null
}
