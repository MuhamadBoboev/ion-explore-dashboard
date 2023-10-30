import { parsePhoneNumber } from 'libphonenumber-js'

export function checkPhoneNumber(phone: string): boolean {
  try {
    const phoneNumber = parsePhoneNumber(phone, 'TJ')
    return phoneNumber.isValid()
  } catch (e) {
    return false
  }
}