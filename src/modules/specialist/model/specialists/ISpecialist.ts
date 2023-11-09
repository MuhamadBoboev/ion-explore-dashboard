import { ISpecialistImage } from '@modules/specialist/model/specialistsImage/ISpecialistImage'
import { IPagination } from '@shared/model/IPagination'

export interface ISpecialist {
  id: number
  image: string | null
  lang_id: string
  name: string
  speciality: string
}

export interface ISpecialistData extends IPagination {
  data: ISpecialist[]
}
