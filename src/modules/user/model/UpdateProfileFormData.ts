import * as yup from 'yup'
import { parsePhoneNumber } from 'libphonenumber-js'
import { checkPhoneNumber } from '@shared/lib/checkPhoneNumber'
import { checkEmail } from '@shared/lib/checkEmail'
import { removeSpaces } from '@shared/lib/removeSpaces'

export interface UpdateProfileFormData {
  name: string
  contact: string
  address?: string
  otp: number
}

yup.addMethod(yup.string, 'checkContact', function (errorMessage) {
  return this.test(`check-contact`, errorMessage, function (value) {
    const {path, createError} = this
    let message = ''
    let isValid = true
    value = value || '1'
    try {
      const phoneNumber = parsePhoneNumber(value, 'TJ')
      if (!(phoneNumber.country === 'TJ' && checkPhoneNumber(value))) {
        message = 'Неверный формат номера телефона или email'
        isValid = false
      }
      if (!value.startsWith('+992')) {
        message = 'Номер телефона должен начинаться с +992'
        isValid = false
      }
    } catch (e) {
      if (!checkEmail(value)) {
        message = 'Неверный формат номера телефона или email'
        isValid = false
      }
    }

    return (
      isValid ||
      createError({path, message: errorMessage || message})
    )
  })
})

export const updateProfileSchema = yup.object().shape({
  contact: yup.string()
    .transform(removeSpaces)// @ts-ignore
    .checkContact()
    .required('Введите ваш номер телефона или Email'),
  name: yup.string().max(255).required('Пожалуйста введите ваше имя'),
  address: yup.string().max(255).nullable(),
  otp: yup.string().length(4, 'Кол-во символов должно быть 4').nullable(),
})
