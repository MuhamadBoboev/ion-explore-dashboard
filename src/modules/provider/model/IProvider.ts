import { ICategory, ISubcategory } from '@modules/catalog'

export interface IProvider {
  description: string
  id: number
  image: string
  lang_id: string
  name: string
  subcategory_id: string
}
