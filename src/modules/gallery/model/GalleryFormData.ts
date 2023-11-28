import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'

export interface GalleryFormData {
  // img: string
  // alt: string
  // category_id: number
  author?: string | null
  location?: string | null
  image?: string | null
}

const yupObject = {
  // img: yup.string().required('Выберите изображение'),
  // alt: yup.string().max(255, getMaxLengthErrorMessage()).required('Введите заголовок'),
  // category_id: yup.number().required('Выберите категорию'),
  author: yup.string().nullable(),
  location: yup.string().nullable(),
  image: yup.string().nullable()
}

type FormType = yup.ObjectSchema<GalleryFormData, yup.AnyObject>

export const createGalleryScheme: FormType = yup.object().shape(yupObject)

export const updateGalleryScheme: FormType = yup.object().shape({
  ...yupObject,
  img: yup.string().nullable()
})
