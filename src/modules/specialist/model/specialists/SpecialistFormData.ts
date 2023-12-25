import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'

export interface SpecialistFormData {
  image?: string | null
  lang_id?: number
  name: string
  speciality: string
  description?: string | null
}

const yupObject = {
  image: yup.string().nullable(),
  lang_id: yup.number().required(),
  name: yup.string().max(255, getMaxLengthErrorMessage()).required('Введите имя специалиста'),
  speciality: yup.string().max(255, getMaxLengthErrorMessage()).required('Введите специализацию'),
  description: yup.string().max(120, getMaxLengthErrorMessage(120)).nullable()
}

type FormType = yup.ObjectSchema<SpecialistFormData, yup.AnyObject>

export const createSpecialistScheme: FormType = yup.object().shape(yupObject)

export const updateSpecialistScheme: FormType = createSpecialistScheme
