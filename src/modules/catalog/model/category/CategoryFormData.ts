import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'
import { transformNumberOrNull } from '@shared/lib/transformNumberOrNull'
import { getMinNumberErrorMessage } from '@shared/lib/getMinNumberErrorMessage'
import { getMaxNumberErrorMessage } from '@shared/lib/getMaxNumberErrorMessage'

export interface CategoryFormData {
  name: string
  description?: string | null
  // icon?: string | null
  order?: number | null
  service_ids?: number[] | null
}

const yupObject = {
  name: yup.string()
    .max(255, getMaxLengthErrorMessage())
    .required('Введите название категории'),
  description: yup.string().nullable(),
  // icon: yup.string().required('Выберите иконку'),
  service_ids: yup.array()
    .of(yup.number().required())
    .nullable(),
  order: yup.number()
    .min(-128, getMinNumberErrorMessage())
    .max(127, getMaxNumberErrorMessage())
    .transform(transformNumberOrNull)
    .nullable()
}

type FormType = yup.ObjectSchema<CategoryFormData, yup.AnyObject>

export const createCategoryScheme: FormType = yup.object().shape(yupObject)

export const updateCategoryScheme: FormType = yup.object().shape({
  ...yupObject,
  // icon: yup.string().nullable(),
})

