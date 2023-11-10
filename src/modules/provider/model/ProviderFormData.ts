import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'
import { ISubcategory } from '@modules/catalog'

export interface ProviderFormData {
  description?: string | null
  image?: string | null
  lang_id?: number
  name?: string
  subcategory_id: number
}

const yupObject = {
  name: yup.string().required('Введите название поставщика').max(255, getMaxLengthErrorMessage()),
  description: yup.string().nullable(),
  lang_id: yup.number().required('Введите язык'),
  image: yup.string().nullable(),
  subcategory_id: yup.number().required()
}

type FormType = yup.ObjectSchema<ProviderFormData, yup.AnyObject>

export const createProviderScheme: FormType = yup.object().shape(yupObject)

export const updateProviderScheme: FormType = yup.object().shape({
  ...yupObject,
  logo: yup.string().nullable()
})
