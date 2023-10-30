import { ISubcategory } from '@modules/catalog'
import { IService } from '@modules/service'

export interface ICategory {
  id: number
  name: string
  description: string | null
  slug: string
  icon: string
  subcategories: ISubcategory[]
  services: IService[]
  order: number | null
}
