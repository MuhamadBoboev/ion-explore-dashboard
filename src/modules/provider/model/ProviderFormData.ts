import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'

export interface ProviderFormData {
  name: string
  description?: string | null
  logo?: string | null
  file?: string | null
  category_ids?: number[] | null
  subcategory_ids?: number[] | null
}

const yupObject = {
  name: yup.string()
    .required('Введите название поставщика')
    .max(255, getMaxLengthErrorMessage()),
  description: yup.string().nullable(),
  logo: yup.string().required('Выберите логотип поставщика'),
  file: yup.string().nullable(),
  category_ids: yup.array()
    .of(yup.number().required())
    .nullable(),
  subcategory_ids: yup.array()
    .of(yup.number().required())
    .nullable(),
}

type FormType = yup.ObjectSchema<ProviderFormData, yup.AnyObject>

export const createProviderScheme: FormType = yup.object().shape(yupObject)

export const updateProviderScheme: FormType = yup.object().shape({
  ...yupObject,
  logo: yup.string().nullable()
})
