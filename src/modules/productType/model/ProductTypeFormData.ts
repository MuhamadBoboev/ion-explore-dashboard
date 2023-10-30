import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'

export interface ProductTypeFormData {
  key: string
  name: string
}

const yupObject = {
  key: yup.string()
    .matches(/^[a-zA-Z\-]+$/, 'Введите только латинские буквы')
    .max(255, getMaxLengthErrorMessage())
    .required('Введите ключ для тип товара'),
  name: yup.string()
    .required('Введите название для тип товара')
    .max(255, getMaxLengthErrorMessage()),
}

type FormType = yup.ObjectSchema<ProductTypeFormData, yup.AnyObject>

export const createProductTypeScheme: FormType = yup.object().shape(yupObject)

export const updateProductTypeScheme = createProductTypeScheme
