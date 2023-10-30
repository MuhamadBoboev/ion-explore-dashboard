import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'

export interface ProductImageFormData {
  title?: string | null
  image: any
  product_id: number
}

const yupObject = {
  title: yup.string().max(255, getMaxLengthErrorMessage()).nullable(),
  image: yup.string().required('Выберите изображение'),
  product_id: yup.number().required(),
}

type FormType = yup.ObjectSchema<ProductImageFormData, yup.AnyObject>

export const createProductImageScheme: FormType = yup.object().shape(yupObject)

export const updateProductImageScheme: FormType = yup.object()
  .shape({
    ...yupObject,
    image: yup.string().nullable()
  })
