import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'
import { transformNumberOrNull } from '@shared/lib/transformNumberOrNull'
import { getMinNumberErrorMessage } from '@shared/lib/getMinNumberErrorMessage'

export interface ShippingTypeFormData {
  icon?: string | null
  name: string
  key: string
  description?: string | null
  price?: number | null
  is_active: boolean
}

const yupObject = {
  icon: yup.string().required('Выберите иконку'),
  name: yup.string()
    .max(255, getMaxLengthErrorMessage())
    .required('Введите название'),
  key: yup.string()
    .matches(/^[a-zA-Z\-]+$/, 'Введите только латинские буквы')
    .max(255, getMaxLengthErrorMessage())
    .required('Введите ключ для тип доставки'),
  description: yup.string().nullable(),
  price: yup.number()
    .transform(transformNumberOrNull)
    .min(0, getMinNumberErrorMessage(0))
    .required('Введите стоимость'),
  is_active: yup.boolean().required('Выберите состояние для тип доставки')
}

type FormType = yup.ObjectSchema<ShippingTypeFormData, yup.AnyObject>

export const createShippingTypeScheme: FormType = yup.object().shape(yupObject)

export const updateShippingTypeScheme: FormType = yup.object().shape({
  ...yupObject,
  icon: yup.string().nullable()
})
