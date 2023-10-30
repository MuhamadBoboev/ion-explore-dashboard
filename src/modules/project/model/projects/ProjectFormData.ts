import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'

export interface ProjectFormData {
  title: string
  short_description?: string | null
  description?: string | null
  image?: string | null
}

const yupObject = {
  title: yup.string()
    .max(255, getMaxLengthErrorMessage())
    .required('Введите заголовок'),
  short_description: yup.string().nullable(),
  description: yup.string().nullable(),
  image: yup.string().required('Выберите изображение'),
}

type FormType = yup.ObjectSchema<ProjectFormData, yup.AnyObject>

export const createProjectScheme: FormType = yup.object().shape(yupObject)

export const updateProjectScheme: FormType = yup.object().shape({
  ...yupObject,
  image: yup.string().nullable(),
})
