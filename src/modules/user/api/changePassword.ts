import { UpdatePasswordFormData } from '@modules/user/model/UpdatePasswordFormData'
import { axiosInstance } from '@shared/api/axiosInstance'
import { getBearerToken } from '@shared/lib/getBearerToken'

export async function changePassword(data: UpdatePasswordFormData) {
  try {
    const response = await axiosInstance.post('/user/change-password', data, {
      headers: {
        Authorization: getBearerToken()
      }
    })

    return {
      success: response.status === 200,
      message: response.data.message
    }
  } catch (e: any) {
    return {
      success: false,
      message: e.response.data.message || 'Произошла ошибка!',
    }
  }
}
