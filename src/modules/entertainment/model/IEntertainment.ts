// import { ICategory, ISubcategory } from '@modules/catalog'

export interface IEntertainment {
  description: string
  id: number
  image: string
  lang_id: string
  subcategory: ISubcategory
  title: string
  contact: IContacts[]
}

export interface ISubcategory {
  id: number
  img: string
  name: string
}

export interface IContacts {
  address: string,
  id: number,
  latitude: string,
  longitude: string,
  phone: string,
  whatsapp: string,
  entertainment_id: number
}
