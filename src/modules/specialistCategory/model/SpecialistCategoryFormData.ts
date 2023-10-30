import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'

export interface SpecialistCategoryFormData {
  name: string
}

const yupObject = {
  name: yup.string()
    .required('Введите названия категории')
    .max(255, getMaxLengthErrorMessage()),
}

type FormType = yup.ObjectSchema<SpecialistCategoryFormData, yup.AnyObject>

export const createSpecialistCategoryScheme: FormType = yup.object().shape(yupObject)

export const updateSpecialistCategoryScheme = createSpecialistCategoryScheme
