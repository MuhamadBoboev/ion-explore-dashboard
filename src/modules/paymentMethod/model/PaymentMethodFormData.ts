import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'

export interface PaymentMethodFormData {
  icon?: string | null
  name: string
  key: string
  description?: string | null
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
    .required('Введите ключ для метод оплаты'),
  description: yup.string().nullable(),
  is_active: yup.boolean().required('Выберите статус метода оплаты')
}

type FormType = yup.ObjectSchema<PaymentMethodFormData, yup.AnyObject>

export const createPaymentMethodScheme: FormType = yup.object().shape(yupObject)

export const updatePaymentMethodScheme: FormType = yup.object().shape({
  ...yupObject,
  icon: yup.string().nullable()
})
