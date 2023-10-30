import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'
import { transformNumberOrNull } from '@shared/lib/transformNumberOrNull'
import { getMinNumberErrorMessage } from '@shared/lib/getMinNumberErrorMessage'
import { getMaxNumberErrorMessage } from '@shared/lib/getMaxNumberErrorMessage'

export interface BannerFormData {
  title: string
  description?: string | null
  image?: string | null
  button_text?: string | null
  link?: string | null
  order?: number | null
  type: string
}

const yupObject = {
  title: yup.string()
    .required('Введите заголовок баннера')
    .max(255, getMaxLengthErrorMessage()),
  description: yup.string().nullable(),
  image: yup.string().required('Выберите изображение'),
  button_text: yup.string().nullable().max(255, getMaxLengthErrorMessage()),
  link: yup.string().nullable().max(255, getMaxLengthErrorMessage()),
  order: yup.number().transform(transformNumberOrNull)
    .min(-128, getMinNumberErrorMessage())
    .max(127, getMaxNumberErrorMessage())
    .nullable(),
  type: yup.string().required('Выберите расположения баннера')
}

type FormType = yup.ObjectSchema<BannerFormData, yup.AnyObject>

export const createBannerScheme: FormType = yup.object().shape(yupObject)

export const updateBannerScheme: FormType = yup.object().shape({
  ...yupObject,
  image: yup.string().nullable()
})
