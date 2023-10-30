import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'
import { transformNumberOrNull } from '@shared/lib/transformNumberOrNull'
import { getMinNumberErrorMessage } from '@shared/lib/getMinNumberErrorMessage'
import { getMaxNumberErrorMessage } from '@shared/lib/getMaxNumberErrorMessage'

export interface ShippingLocationFormData {
  name: string
  price?: number | null
  is_active: boolean
  order?: number | null
}

const yupObject = {
  name: yup.string()
    .max(255, getMaxLengthErrorMessage())
    .required('Введите название'),
  price: yup.number()
    .transform(transformNumberOrNull)
    .min(0, getMinNumberErrorMessage(0))
    .required('Введите стоимость'),
  is_active: yup.boolean().required('Выберите состояние для тип доставки'),
  order: yup.number()
    .transform(transformNumberOrNull)
    .min(-128, getMinNumberErrorMessage(0))
    .max(127, getMaxNumberErrorMessage())
    .nullable(),
}

type FormType = yup.ObjectSchema<ShippingLocationFormData, yup.AnyObject>

export const createShippingLocationScheme: FormType = yup.object().shape(yupObject)

export const updateShippingLocationScheme: FormType = createShippingLocationScheme
