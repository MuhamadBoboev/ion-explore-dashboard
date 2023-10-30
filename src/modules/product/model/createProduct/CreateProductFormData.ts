import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'
import { transformNumberOrNull } from '@shared/lib/transformNumberOrNull'
import { getMinNumberErrorMessage } from '@shared/lib/getMinNumberErrorMessage'
import { getMaxNumberErrorMessage } from '@shared/lib/getMaxNumberErrorMessage'

export interface CreateProductFormData {
  name: string
  description?: string | null
  image: string
  sku: string
  provider_id: number | undefined
  category_id?: number[] | null
  subcategory_id?: number[] | null
  collection_id?: number[] | null
  base_price: number
  unit?: string | null
  discount?: number | null
  quantity: number
  product_type_id?: number | null
  service_ids?: number[] | null
}

type FormType = yup.ObjectSchema<CreateProductFormData, yup.AnyObject>

export const createProductScheme: FormType = yup.object().shape({
  name: yup.string()
    .max(255, getMaxLengthErrorMessage())
    .required('Введите название товара'),
  description: yup.string().nullable(),
  image: yup.string().required('Выберите изображение'),
  sku: yup.string()
    .max(255, getMaxLengthErrorMessage())
    .required('Введите артикул (код) товара'),
  provider_id: yup.number().required('Выберите поставщика'),
  category_id: yup.array()
    .of(yup.number().required())
    .min(1, 'Выберите категорию')
    .required('Выберите категорию'),
  subcategory_id: yup.array().of(yup.number().required()),
  collection_id: yup.array().of(yup.number().required()),
  base_price: yup.number()
    .transform(transformNumberOrNull)
    .min(0)
    .required('Введите базовую цена для товара'),
  unit: yup.string()
    .max(255, getMaxLengthErrorMessage())
    .nullable(),
  discount: yup.number()
    .transform(transformNumberOrNull)
    .min(0, getMinNumberErrorMessage(0))
    .max(100, getMaxNumberErrorMessage(100))
    .nullable(),
  quantity: yup.number()
    .transform(transformNumberOrNull)
    .min(0)
    .required('Введите доступное количество товара'),
  product_type_id: yup.number().nullable(),
  service_ids: yup.array()
    .of(yup.number().required())
    .nullable(),
})
