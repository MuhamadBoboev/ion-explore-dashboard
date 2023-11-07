export interface IBanner {
  address: string,
  facebook: string,
  id: number,
  instagram: string,
  lang_id: string,
  phone: string,
  telegram: string
}

export type BannerType = 'main' | 'secondary' | 'tertiary'
