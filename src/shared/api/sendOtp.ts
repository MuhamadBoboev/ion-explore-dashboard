import { axiosInstance } from '@shared/api/axiosInstance'
import { getContactType } from '@shared/lib/getContactType'
import { removeSpaces } from '@shared/lib/removeSpaces'

type SendOtpType = {
  success: boolean
  message: string
}

export async function sendOtp(contact: string): Promise<SendOtpType> {
  const contactType = getContactType(contact)
  if (contactType === 'invalid') {
    return {
      success: false,
      message: 'Введите правильный Email или номер телефона'
    }
  }
  const url = {
    phone: '/send-code',
    email: '/send-code-email',
  }
  try {
    const response = await axiosInstance.post(url[contactType], {
      [contactType]: removeSpaces(contact),
    })

    return {
      success: response.status === 200,
      message: response.data.message
    }
  } catch (error: any) {

    return {
      success: false,
      message: error.response?.data.message,
    }
  }
}
