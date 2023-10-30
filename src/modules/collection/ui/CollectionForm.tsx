import {
  Control,
  Controller,
  FieldErrors,
  UseFormGetValues,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch
} from 'react-hook-form'
import TextFieldCustom from '@shared/ui/TextFieldCustom'
import ModalFormControl from '@shared/ui/ModalFormControl'
import InputLabel from '@mui/material/InputLabel'
import { Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { CollectionFormData } from '@modules/collection/model/CollectionFormData'
import { IProvider } from '@modules/provider'
import { useEffect, useRef, useState } from 'react'
import { ICategory, ISubcategory } from '@modules/catalog'

interface Props {
  providers: IProvider[]
  errors: FieldErrors<CollectionFormData>
  control: Control<CollectionFormData>
  watch: UseFormWatch<CollectionFormData>
  getValues: UseFormGetValues<CollectionFormData>
  setValue: UseFormSetValue<CollectionFormData>
  reset: UseFormReset<CollectionFormData>
}

function CollectionForm({providers, control, errors, watch, getValues, setValue, reset}: Props) {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [subcategories, setSubcategories] = useState<ISubcategory[]>([])
  const [openCategory, setOpenCategory] = useState(false)
  const [openSubcategory, setOpenSubcategory] = useState(false)

  useEffect(() => {
    const provider = providers.find(({id}) => getValues('provider_id') === id)
    setCategories(provider?.categories || [])
    setSubcategories([])
  }, [watch('provider_id')])

  useEffect(() => {
    const selectedCategoryId = getValues('category_id')[0]
    if (selectedCategoryId) {
      const providerId = getValues('provider_id')
      const provider = providers.find(({id}) => id === providerId)!
      setSubcategories(provider.subcategories.filter(
        (subcategory) => subcategory.category_id === selectedCategoryId
      ))
    }
  }, [watch('category_id')])

  return (
    <>
      <TextFieldCustom
        name="name"
        control={control}
        label="Название"
        errorMessage={errors.name?.message}
        required
      />
      <ModalFormControl errorMessage={errors.provider_id?.message}>
        <InputLabel id="select-provider">Поставщик *</InputLabel>
        <Controller
          name="provider_id"
          control={control}
          render={({field}) => (
            <Select
              labelId="select-provider-label"
              id="select-provider"
              label="Поставщик *"
              {...field}
              required
              onChange={(event) => {
                if (field.onChange) {
                  field.onChange(event)
                }
                setValue('category_id', [])
                setValue('subcategory_id', [])
              }}
            >
              {providers.map(({id, name}) => (
                <MenuItem key={id} value={id}>{name}</MenuItem>
              ))}
            </Select>
          )}
        />
      </ModalFormControl>
      <ModalFormControl errorMessage={errors.category_id?.message}>
        <InputLabel id="select-category">Категория *</InputLabel>
        <Controller
          name="category_id"
          control={control}
          render={({field}) => (
            <Select
              labelId="select-category-label"
              id="select-category"
              label="Категория *"
              required
              {...field}
              disabled={!watch('provider_id')}
              multiple
              onChange={(event) => {
                if (field.onChange) {
                  field.onChange(event)
                }
                const selected: number | undefined = +event.target.value[event.target.value.length - 1]
                if (selected) {
                  setValue('category_id', [selected])
                }
                setValue('subcategory_id', [])
                setOpenCategory(false)
              }}
              open={openCategory}
              onOpen={() => setOpenCategory(true)}
              onClose={() => setOpenCategory(false)}
            >
              {categories.map(({id, name}) => (
                <MenuItem key={id} value={id}>{name}</MenuItem>
              ))}
            </Select>
          )}
        />
      </ModalFormControl>
      <ModalFormControl errorMessage={errors.subcategory_id?.message}>
        <InputLabel id="select-subcategory">Подкатегория</InputLabel>
        <Controller
          name="subcategory_id"
          control={control}
          render={({field}) => (
            <Select
              labelId="select-subcategory-label"
              id="select-subcategory"
              label="Подкатегория"
              {...field}
              required
              multiple
              disabled={!watch('category_id')[0]}
              onChange={(event) => {
                if (field.onChange) {
                  field.onChange(event)
                }
                setOpenSubcategory(false)
              }}
              open={openSubcategory}
              onOpen={() => setOpenSubcategory(true)}
              onClose={() => setOpenSubcategory(false)}
            >
              {subcategories.map(({id, name}) => (
                <MenuItem key={id} value={id}>{name}</MenuItem>
              ))}
            </Select>
          )}
        />
      </ModalFormControl>
    </>
  )
}

export { CollectionForm }
