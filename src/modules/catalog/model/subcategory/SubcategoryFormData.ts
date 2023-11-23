import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'
import { transformNumberOrNull } from '@shared/lib/transformNumberOrNull'
import { getMinNumberErrorMessage } from '@shared/lib/getMinNumberErrorMessage'
import { getMaxNumberErrorMessage } from '@shared/lib/getMaxNumberErrorMessage'

export interface SubcategoryFormData {
  name: string
  category_id: number
  // image?: any
  icon: any
}

const yupObject = {
  name: yup.string().max(255, getMaxLengthErrorMessage()).required('Введите название подкатегории'),
  category_id: yup.number().required('Введите название подкатегории'),
  // image: yup.string().nullable(),
  icon: yup.string().required('Добавьте иконку')
}

type FormType = yup.ObjectSchema<SubcategoryFormData, yup.AnyObject>

export const createSubcategoryScheme: FormType = yup.object().shape(yupObject)

export const updateSubcategoryScheme: FormType = yup.object().shape({
  ...yupObject,
  icon: yup.string().nullable()
})
