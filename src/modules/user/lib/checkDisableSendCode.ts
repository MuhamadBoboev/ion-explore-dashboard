import { parsePhoneNumber } from 'libphonenumber-js'
import { checkPhoneNumber } from '@shared/lib/checkPhoneNumber'
import { checkEmail } from '@shared/lib/checkEmail'

export function checkDisableSendCode(contact = '1') {
  let isValid: boolean | null = false
  try {
    const phoneNumber = parsePhoneNumber(contact, 'TJ')
    isValid = phoneNumber.country === 'TJ' && checkPhoneNumber(contact) && contact.startsWith('+992')
  } catch (e) {
  }
  if (!isValid) {
    isValid = checkEmail(contact)
  }

  return isValid
}
