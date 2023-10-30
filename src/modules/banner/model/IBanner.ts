export interface IBanner {
  id: number
  title: string
  description?: string
  image: string
  button_text?: string
  link?: string
  order?: number
  type: BannerType
}

export type BannerType = 'main' | 'secondary' | 'tertiary'
