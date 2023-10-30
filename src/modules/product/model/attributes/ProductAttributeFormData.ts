import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'
import { getMinNumberErrorMessage } from '@shared/lib/getMinNumberErrorMessage'

export interface ProductAttributeFormData {
  product_id: number
  attribute_id: number
  value: string
  quantity: number
  price: number
  sku: string
}

const yupObject = {
  product_id: yup.number().required(),
  attribute_id: yup.number().required('Выберите атрибут'),
  value: yup.string()
    .required('Введите значение атрибута')
    .max(255, getMaxLengthErrorMessage()),
  quantity: yup.number()
    .min(0, getMinNumberErrorMessage(0))
    .required('Введите кол-во товара с данным атрибутом'),
  price: yup.number()
    .min(0, getMinNumberErrorMessage(0))
    .required('Введите цену для этого атрибута'),
  sku: yup.string()
    .required('Введите артикул (код) атрибута')
    .max(255, getMaxLengthErrorMessage()),
}

type FormType = yup.ObjectSchema<ProductAttributeFormData, yup.AnyObject>

export const createProductAttributeScheme: FormType = yup.object().shape(yupObject)

export const updateProductAttributeScheme = createProductAttributeScheme
