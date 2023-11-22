// import { Entertaiment } from '@modules/provider'
import { axiosInstance } from '@shared/api/axiosInstance'
import { IEntertainment } from '../model/IEntertainment'

export async function getEntertainment(): Promise<IEntertainment[] | null> {
  try {
    const response = await axiosInstance.get('/providers')
    return response.data.data
  } catch (e) {
    return null
  }
}
