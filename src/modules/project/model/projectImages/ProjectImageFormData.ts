import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'

export interface ProjectImageFormData {
  title?: string | null
  image?: string | null
  project_id?: number | null
}

const yupObject = {
  title: yup.string().max(255, getMaxLengthErrorMessage()).nullable(),
  image: yup.string().required('Выберите изображение'),
  project_id: yup.number().required()
}

type FormType = yup.ObjectSchema<ProjectImageFormData, yup.AnyObject>

export const createProjectImageScheme: FormType = yup.object().shape(yupObject)

export const updateProjectImageScheme: FormType = yup.object().shape({
  ...yupObject,
  image: yup.string().nullable(),
  project_id: yup.number().nullable(),
})

