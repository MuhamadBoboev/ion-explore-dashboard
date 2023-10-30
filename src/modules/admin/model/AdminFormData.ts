import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'

export interface AdminFormData {
  name: string
  email?: string | null
  password?: string | null
  role_ids: number[]
}

const yupObject = {
  name: yup.string().max(255, getMaxLengthErrorMessage()).required('Введите имя пользователя'),
  email: yup.string().email('Некорректный Email').nullable(),
  password: yup.string().min(6, 'Мин. кол-во символов 6').required('Введите новый пароль для пользователя'),
  role_ids: yup.array().of(yup.number().required()).required('Выберите роль пользователя')
}

type FormType = yup.ObjectSchema<AdminFormData, yup.AnyObject>

export const createAdminScheme: FormType = yup.object().shape(yupObject)

export const updateAdminScheme: FormType = yup.object().shape({
  ...yupObject,
  password: yup.string().min(6, 'Мин. кол-во символов 6').nullable(),
})
