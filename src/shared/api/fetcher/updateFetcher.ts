import { axiosInstance } from '@shared/api/axiosInstance'
import { getBearerToken } from '@shared/lib/getBearerToken'


export async function updateFetcher(
  [url, id]: any,
  {arg: data}: { arg: any }
) {
  try {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    for (let key in data) {
      if (data[key] !== null && data[key] !== undefined) {
        if (Array.isArray(data[key])) {
          data[key].forEach((value: string) => (
            formData.append(`${key}[]`, value)
          ))
        } else {
          formData.append(key, data[key])
        }
      }
    }
    const response = await axiosInstance.post(`${url}/${id}`, formData, {
      headers: {
        Authorization: getBearerToken()
      },
    })
    return response.data
  } catch (e) {
    throw e
  }
}
