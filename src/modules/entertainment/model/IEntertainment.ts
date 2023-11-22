// import { ICategory, ISubcategory } from '@modules/catalog'

export interface IEntertainment {
  description: string
  id: number
  image: string
  lang_id: string
  subcategory: ISubcategory
  title: string
}

export interface ISubcategory {
  id: number
  img: string
  name: string
}
