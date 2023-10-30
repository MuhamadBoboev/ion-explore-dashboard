import { IProvider } from '@modules/provider'
import { ICategory, ISubcategory } from '@modules/catalog'
import { IPagination } from '@shared/model/IPagination'

export interface ICollection {
  id: number
  name: string
  provider: IProvider
  category: ICategory
  subcategory: ISubcategory | null
}

export interface ICollectionData extends IPagination {
  data: ICollection[]
}
