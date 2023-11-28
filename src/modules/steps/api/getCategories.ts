import { axiosInstance } from '@shared/api/axiosInstance'
import { ICategory } from '@modules/catalog'

export async function getCategories(): Promise<ICategory[] | null> {
  try {
    const response = await axiosInstance.get('/categories')
    return response.data.data
  } catch (e) {
    return null
  }
}
