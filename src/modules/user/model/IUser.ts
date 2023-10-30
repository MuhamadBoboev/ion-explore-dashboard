import { IRole } from '@shared/model/IRole'
import { IPagination } from '@shared/model/IPagination'

export interface IUser {
  id: number
  name: string
  email: string | null
  phone: string | null
  roles: IRole[]
  address: string | null
  created_at: string
  updated_at: string
}

export interface IUserData extends IPagination {
  data: IUser[]
}
