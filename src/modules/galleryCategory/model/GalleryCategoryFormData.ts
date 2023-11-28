import * as yup from 'yup'

export interface GalleryCategoryFormData {
  name: string
  lang_id: number
}

const yupObject = {
  name: yup.string().required('Введите название'),
  lang_id: yup.number().required('Выберите язык'),
}

type FormType = yup.ObjectSchema<GalleryCategoryFormData, yup.AnyObject>

export const createGalleryCategoryScheme: FormType = yup.object().shape(yupObject)

export const updateGalleryCategoryScheme: FormType = createGalleryCategoryScheme