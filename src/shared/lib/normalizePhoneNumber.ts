import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js'

export const normalizePhoneNumber = (value: string) => {
  const phoneNumber = parsePhoneNumberFromString(value)

  if(!phoneNumber){
    return value
  }

  return new AsYouType().input(value)
}