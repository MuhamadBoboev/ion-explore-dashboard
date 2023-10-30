import * as yup from 'yup'

export interface UpdatePasswordFormData {
  old_password: string
  password: string
  password_confirmation: string
}

export const updatePasswordScheme = yup.object().shape({
  old_password: yup.string().min(6, 'Мин. кол-во символов 6'),
  password: yup.string().min(6, 'Мин. кол-во символов 6'),
  password_confirmation: yup.string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
})
