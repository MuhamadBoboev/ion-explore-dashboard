import { IRole } from '@shared/model/IRole'

export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  contact: string
  password: string
  rememberMe?: boolean
}

export type UserDataType = {
  id: number
  name: string
  email: string | null
  phone: string | null
  roles: IRole[]
  address: string | null
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void,
  // initAuth(): void
}
