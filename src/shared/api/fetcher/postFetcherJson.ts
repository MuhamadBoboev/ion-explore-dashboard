import { axiosInstance } from '@shared/api/axiosInstance'
import { getBearerToken } from '@shared/lib/getBearerToken'

export async function postFetcherJson(url: string, {arg: data}: {arg: any}) {
  try {
    const formData: any = {}
    for (let key in data) {
      if (data[key] !== null && data[key] !== undefined) {
        if (Array.isArray(data[key])) {
          data[key].forEach((value: string) => (
            formData[`${key}[]`] = value
          ))
        } else {
          formData[key] = data[key]
        }
      }
    }
    const response = await axiosInstance.post(url, formData, {
      headers: {
        Authorization: getBearerToken()
      },
    })
    return response.data
  } catch (e) {
    throw e
  }
}
