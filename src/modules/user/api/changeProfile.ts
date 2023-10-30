import { UpdateProfileFormData } from '@modules/user/model/UpdateProfileFormData'
import { axiosInstance } from '@shared/api/axiosInstance'
import { getContactType } from '@shared/lib/getContactType'
import { removeSpaces } from '@shared/lib/removeSpaces'

export async function changeProfile({name, contact, address, otp}: UpdateProfileFormData) {
  try {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    const type = getContactType(contact)
    if (type === 'invalid') {
      return {
        success: false,
        message: 'Введите правильный формат номера телефона или Email'
      }
    }
    formData.append(type, removeSpaces(contact))
    formData.append('name', name)
    formData.append('address', address || '')
    formData.append('otp', otp.toString())
    const response = await axiosInstance.post('/user/profile', formData, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`
      }
    })

    return {
      success: true,
      message: response.data.message,
    }
  } catch (e: any) {

    return {
      success: false,
      message: e?.response?.data?.message
    }
  }
}
