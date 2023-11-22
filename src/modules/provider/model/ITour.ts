import { ICategory, ISubcategory } from '@modules/catalog'

export interface ITour {
  description: string
  gallery?: IGalleryItem[]
  id: number
  image?: string
  lang_id: string
  latitude?: number | null
  longitude?: number | null
  name?: string
  steps?: IStepsItem[]
  subcategory: {
    icon: string
    id: number
    name: string
  }
}

export interface IGalleryItem {
  id: number
  img: string
}

export interface IStepsItem {
  description: string
  id: number
  name: string
  step: string
}
