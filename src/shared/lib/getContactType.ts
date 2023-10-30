import { checkEmail } from './checkEmail'
import { checkPhoneNumber } from './checkPhoneNumber'

export function getContactType(contact: string): 'phone' | 'email' | 'invalid' {
  if (checkEmail(contact)) {
    return 'email'
  } else if (checkPhoneNumber(contact)) {
    return 'phone'
  } else {
    return 'invalid'
  }
}
