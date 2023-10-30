import { ISpecialistImage } from '@modules/specialist/model/specialistsImage/ISpecialistImage'
import { ISpecialistCategory } from 'src/modules/specialistCategory'
import { IPagination } from '@shared/model/IPagination'

export interface ISpecialist {
  id: number
  name: string
  avatar: string | null
  category: ISpecialistCategory
  slug: string
  specialization: string
  experience: string | null
  description: string | null
  images: ISpecialistImage[]
  phone: string | null
  instagram: string | null
  created_at: string
  updated_at: string
}

export interface ISpecialistData extends IPagination {
  data: ISpecialist[]
}
