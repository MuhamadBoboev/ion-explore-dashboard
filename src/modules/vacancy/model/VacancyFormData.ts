import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'

export interface VacancyFormData {
  name: string
  vacancy_category_id?: number | null
  short_description?: string | null
  description: string
}

export const yupObject = {
  name: yup.string().max(255, getMaxLengthErrorMessage()).required('Введите название вакансии'),
  vacancy_category_id: yup.number().nullable(),
  short_description: yup.string().max(255, getMaxLengthErrorMessage()).nullable(),
  description: yup.string().required('Введите описание вакансии')
}

type FormType = yup.ObjectSchema<VacancyFormData, yup.AnyObject>

export const createVacancyScheme: FormType = yup.object().shape(yupObject)

export const updateVacancyScheme = createVacancyScheme
