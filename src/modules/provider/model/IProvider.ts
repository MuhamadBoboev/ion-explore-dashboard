import { ICategory, ISubcategory } from '@modules/catalog'

export interface IProvider {
  id: number
  name: string
  logo: string
  slug: string
  description: string | null
  categories: ICategory[]
  subcategories: ISubcategory[]
  file: string | null
}
