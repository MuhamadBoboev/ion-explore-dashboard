import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'

export interface AttributeFormData {
  name: string
  unit?: string | null
}

const yupObject = {
  name: yup.string()
    .required('Введите название атрибута')
    .max(255, getMaxLengthErrorMessage()),
  unit: yup.string()
    .max(255, getMaxLengthErrorMessage())
    .nullable('Введите единица измерения для атрибута'),
}

type FormType = yup.ObjectSchema<AttributeFormData, yup.AnyObject>

export const createAttributeTypeScheme: FormType = yup.object().shape(yupObject)

export const updateAttributeScheme = createAttributeTypeScheme
