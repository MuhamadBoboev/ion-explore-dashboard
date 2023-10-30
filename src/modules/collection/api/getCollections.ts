import { axiosInstance } from '@shared/api/axiosInstance'
import { ICollection } from '@modules/collection'

export async function getCollections(): Promise<ICollection[] | null> {
  try {
    const response = await axiosInstance.get('/collections')
    return response.data.data
  } catch (e) {
    return null
  }
}
