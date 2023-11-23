import { ISubcategory } from '@modules/catalog'
// import { IService } from '@modules/service'

export interface ICategory {
  id: number
  lang_id: number
  name: string
  slug: string
  subcategory: ISubcategory[]
}
