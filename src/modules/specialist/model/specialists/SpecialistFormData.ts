import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'

export interface SpecialistFormData {
  name: string
  specialist_category_id: number
  avatar?: string | null
  specialization: string
  experience?: string | null
  description?: string | null
  phone?: string | null
  instagram?: string | null
}

const yupObject = {
  name: yup.string()
    .max(255, getMaxLengthErrorMessage())
    .required('Введите имя специалиста'),
  specialist_category_id: yup.number().required('Выберите категорию'),
  avatar: yup.string().nullable(),
  specialization: yup.string()
    .max(255, getMaxLengthErrorMessage())
    .required('Введите специализацию'),
  experience: yup.string().max(255, getMaxLengthErrorMessage()).nullable(),
  description: yup.string().nullable(),
  phone: yup.string().max(255, getMaxLengthErrorMessage()).nullable(),
  instagram: yup.string().max(255, getMaxLengthErrorMessage()).nullable(),
}

type FormType = yup.ObjectSchema<SpecialistFormData, yup.AnyObject>

export const createSpecialistScheme: FormType = yup.object().shape(yupObject)

export const updateSpecialistScheme: FormType = createSpecialistScheme
