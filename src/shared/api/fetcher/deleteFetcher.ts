import { axiosInstance } from '@shared/api/axiosInstance'
import { getBearerToken } from '@shared/lib/getBearerToken'


export async function deleteFetcher(url: string, {arg}: {arg: number}) {
  try {
    const response = await axiosInstance.delete(`${url}/${arg}`, {
      headers: {
        Authorization: getBearerToken()
      },
    })
    return response.data
  } catch (e) {
    throw e
  }
}
