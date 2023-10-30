import { IVacancyCategory } from '@modules/vacancyCategory'
import { IPagination } from '@shared/model/IPagination'

export interface IVacancy {
  id: number
  name: string
  category: IVacancyCategory | null
  short_description: string
  description: string
  slug: string
  created_at: string
  updated_at: string
}

export interface IVacanciesData extends IPagination {
  data: IVacancy[]
}
