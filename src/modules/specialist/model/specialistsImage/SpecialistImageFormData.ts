import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'

export interface SpecialistImageFormData {
  title?: string | null
  image?: string | null
  specialist_id?: number | null
}

const yupObject = {
  title: yup.string().max(255, getMaxLengthErrorMessage()).nullable(),
  image: yup.string().required('Выберите изображение'),
  specialist_id: yup.number().required()
}

type FormType = yup.ObjectSchema<SpecialistImageFormData, yup.AnyObject>

export const createSpecialistImageScheme: FormType = yup.object().shape(yupObject)

export const updateSpecialistImageScheme: FormType = yup.object().shape({
  ...yupObject,
  image: yup.string().nullable(),
  specialist_id: yup.number().nullable(),
})

