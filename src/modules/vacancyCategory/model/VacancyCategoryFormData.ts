import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'

export interface VacancyCategoryFormData {
  name: string
}

const yupObject = {
  name: yup.string()
    .required('Введите название категории')
    .max(255, getMaxLengthErrorMessage()),
}

type FormType = yup.ObjectSchema<VacancyCategoryFormData, yup.AnyObject>

export const createVacancyCategoryScheme: FormType = yup.object().shape(yupObject)

export const updateVacancyCategoryScheme = createVacancyCategoryScheme
