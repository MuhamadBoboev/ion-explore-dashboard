import { IGallery } from '@modules/gallery/model/IGallery'

export interface IGalleryCategory {
  id: number
  name: string
  images: IGallery[]
  lang_id: string
}
