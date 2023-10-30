import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'
import { transformNumberOrNull } from '@shared/lib/transformNumberOrNull'
import { getMinNumberErrorMessage } from '@shared/lib/getMinNumberErrorMessage'
import { getMaxNumberErrorMessage } from '@shared/lib/getMaxNumberErrorMessage'

export interface SubcategoryFormData {
  name: string
  description?: string | null
  // icon: any
  category_id: number
  order?: number | null
  service_ids?: number[] | null
}

const yupObject = {
  name: yup.string()
    .max(255, getMaxLengthErrorMessage())
    .required('Введите название подкатегории'),
  description: yup.string().nullable(),
  // icon: yup.string().required('Выберите иконку'),
  category_id: yup.number().required('Выберите категорию'),
  service_ids: yup.array()
    .of(yup.number().required())
    .nullable(),
  order: yup.number()
    .min(-128, getMinNumberErrorMessage())
    .max(127, getMaxNumberErrorMessage())
    .transform(transformNumberOrNull)
    .nullable()
}

type FormType = yup.ObjectSchema<SubcategoryFormData, yup.AnyObject>

export const createSubcategoryScheme: FormType = yup.object().shape(yupObject)

export const updateSubcategoryScheme: FormType = yup.object().shape({
  ...yupObject,
  // icon: yup.string().nullable(),
})

