import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'

export interface ServiceFormData {
  name: string
  description?: string | null
  image?: string | null
  price: number
  unit: string
  sku: string
}

const yupObject = {
  name: yup.string()
    .max(255, getMaxLengthErrorMessage())
    .required('Введите название услуги'),
  description: yup.string().nullable(),
  image: yup.string().required('Выберите изображение'),
  price: yup.number().min(0).required('Введите цену услуги'),
  unit: yup.string()
    .max(255, getMaxLengthErrorMessage())
    .required('Введите ед. измерения для услуги'),
  sku: yup.string()
    .max(255, getMaxLengthErrorMessage())
    .required('Введите код услуги'),
}

type FormType = yup.ObjectSchema<ServiceFormData, yup.AnyObject>

export const createServiceScheme: FormType = yup.object().shape(yupObject)

export const updateServiceScheme: FormType = yup.object().shape({
  ...yupObject,
  image: yup.string().nullable(),
})
