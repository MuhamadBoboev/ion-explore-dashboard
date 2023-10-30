import { IProjectImage } from '@modules/project/model/projectImages/IProjectImage'
import { IPagination } from '@shared/model/IPagination'

export interface IProject {
  id: number
  title: string
  slug: string
  image: string
  images: IProjectImage[]
  short_description: string | null
  description: string | null
}

export interface IProjectData extends IPagination {
  data: IProject[]
}
