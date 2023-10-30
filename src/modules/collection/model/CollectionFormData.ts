import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'

export interface CollectionFormData {
  name: string
  provider_id: number
  category_id: number[]
  subcategory_id?: number[] | null
}

const yupObject = {
  name: yup.string()
    .required('Введите название коллекции')
    .max(255, getMaxLengthErrorMessage()),
  provider_id: yup.number().required('Выберите поставщика'),
  category_id: yup.array()
    .of(yup.number().required())
    .required('Выберите категорию')
    .length(1, 'Выберите категорию'),
  subcategory_id: yup.array().of(yup.number().required()).nullable(),
}

type FormType = yup.ObjectSchema<CollectionFormData, yup.AnyObject>

export const createCollectionScheme: FormType = yup.object().shape(yupObject)

export const updateCollectionScheme = createCollectionScheme
