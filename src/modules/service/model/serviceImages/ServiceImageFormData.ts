import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'

export interface ServiceImageFormData {
  title?: string | null
  image?: string | null
  service_id?: number | null
}

const yupObject = {
  title: yup.string().max(255, getMaxLengthErrorMessage()).nullable(),
  image: yup.string().required('Выберите изображение'),
  service_id: yup.number().required()
}

type FormType = yup.ObjectSchema<ServiceImageFormData, yup.AnyObject>

export const createServiceImageScheme: FormType = yup.object().shape(yupObject)

export const updateServiceImageScheme: FormType = yup.object().shape({
  ...yupObject,
  image: yup.string().nullable(),
  service_id: yup.number().nullable(),
})

