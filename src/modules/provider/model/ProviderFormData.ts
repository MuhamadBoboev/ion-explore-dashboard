import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'
import { ISubcategory } from '@modules/catalog'
import { transformNumberOrNull } from '@shared/lib/transformNumberOrNull'

export interface ProviderFormData {
  description?: string | null
  image?: string | null
  lang_id?: number
  name?: string
  gallery?: IGallery[] | null
  subcategory_id: number
  latitude?: number | null
  longitude?: number | null
  region: string | null
}

interface IGallery {
  id: number
  img: string
}

const yupObject = {
  name: yup.string().required('Введите название поставщика').max(255, getMaxLengthErrorMessage()),
  description: yup.string().nullable(),
  lang_id: yup.number().required('Введите язык'),
  image: yup.string().nullable(),
  subcategory_id: yup.number().required(),
  latitude: yup.number().transform(transformNumberOrNull).nullable(),
  longitude: yup.number().transform(transformNumberOrNull).nullable(),
  gallery: yup.array().nullable(),
  region: yup.string().required('Введите регион')
}

type FormType = yup.ObjectSchema<ProviderFormData, yup.AnyObject>

export const createProviderScheme: FormType = yup.object().shape(yupObject)

export const updateProviderScheme: FormType = yup.object().shape({
  ...yupObject,
  logo: yup.string().nullable()
})
