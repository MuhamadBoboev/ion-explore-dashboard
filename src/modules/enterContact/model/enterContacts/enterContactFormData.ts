import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'
import { transformNumberOrNull } from '@shared/lib/transformNumberOrNull'
import { getMinNumberErrorMessage } from '@shared/lib/getMinNumberErrorMessage'
import { getMaxNumberErrorMessage } from '@shared/lib/getMaxNumberErrorMessage'

export interface EnterContactFormData {
  // id: number
  address?: string | null
  latitude?: string | null
  longitude?: string | null
  phone?: string | null
  whatsapp?: string | null
  entertainment_id: number
}

const yupObject = {
  // address: yup.string().max(255, getMaxLengthErrorMessage()).required('Введите название категории'),
  // id: yup.number().required(),
  address: yup.string().nullable(),
  latitude: yup.string().nullable(),
  longitude: yup.string().nullable(),
  phone: yup.string().nullable(),
  whatsapp: yup.string().nullable(),
  entertainment_id: yup.number().required()
}

type FormType = yup.ObjectSchema<EnterContactFormData, yup.AnyObject>

export const createEnterContactScheme: FormType = yup.object().shape(yupObject)

export const updateEnterContactScheme: FormType = yup.object().shape({
  ...yupObject
  // icon: yup.string().nullable(),
})
