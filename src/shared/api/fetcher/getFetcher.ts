import { axiosInstance } from '@shared/api/axiosInstance'
import { getBearerToken } from '@shared/lib/getBearerToken'
import { useLanguageStore } from '@shared/model/store'

export async function getFetcher(url: string) {
  let [_, lang] = url.slice(url.indexOf('?')).split('=')

  try {
    const response = await axiosInstance.get(url, {
      headers: {
        Authorization: getBearerToken(),
        'Accept-Language': lang
      },
    })
    return response.data
  } catch (e) {
    throw e
  }
}
