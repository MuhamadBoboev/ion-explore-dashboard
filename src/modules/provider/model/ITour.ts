export interface ITour {
  description: string
  gallery: IGalleryItem[]
  id: number
  image?: string
  lang_id: string
  latitude?: number | null
  longitude?: number | null
  name?: string
  steps: IStepsItem[]
  subcategory: ISubcategory
  region: string | null
}

interface ISubcategory {
  icon: string
  id: number
  name: string
}
export interface IGalleryItem {
  id: number
  img: any
}

export interface IStepsItem {
  description: string
  id: number
  name: string
  order: number
  step: string
  tour_id: number
}
