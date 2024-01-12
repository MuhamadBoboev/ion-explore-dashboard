import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'
import { ISubcategory } from '@modules/catalog'
import { IContacts } from './IEntertainment'

export interface EntertainmentFormData {
  description?: string | null
  image?: string | null
  lang_id?: number
  // name?: string
  subcategory_id: number
  title?: string | null
}

const yupObject = {
  // name: yup.string().required('Введите название поставщика').max(255, getMaxLengthErrorMessage()),
  description: yup.string().nullable(),
  lang_id: yup.number().required('Введите язык'),
  image: yup.string().nullable(),
  subcategory_id: yup.number().required(),
  title: yup.string().nullable()
}

type FormType = yup.ObjectSchema<EntertainmentFormData, yup.AnyObject>

export const createEntertainmentScheme: FormType = yup.object().shape(yupObject)

export const updateEntertainmentScheme: FormType = yup.object().shape({
  ...yupObject,
  logo: yup.string().nullable()
})
