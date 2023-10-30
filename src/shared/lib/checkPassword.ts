import { validatePassword } from './validatePassword'

export function checkPassword(value: string) {
  let message = 'Пароль может включать только англ. буквы, цифры и спецсимволы (!, @, #, $, %, ^, &, *)'
  if (value.length < 6) {
    message = 'Минимальное количество символов 6'
  }
  if (value.length > 255) {
    message = 'Максимальное количество символов 255'
  }
  return !validatePassword(value) ? message : true
}
