import { Control, Controller, FieldErrors, UseFormGetValues, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import TextFieldCustom from '@shared/ui/TextFieldCustom'
import { FileUploader } from '@shared/ui/FileUploader'
import { ProviderFormData } from '@modules/provider/model/ProviderFormData'
import { ICategory, ISubcategory } from '@modules/catalog'
import ModalFormControl from '@shared/ui/ModalFormControl'
import InputLabel from '@mui/material/InputLabel'
import { Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'

interface Props {
  errors: FieldErrors<ProviderFormData>
  control: Control<ProviderFormData>
  images: File[]
  setImages: Dispatch<SetStateAction<File[]>>
  files: File[]
  setFiles: Dispatch<SetStateAction<File[]>>
  setValue: UseFormSetValue<ProviderFormData>
  categories: ICategory[]
  getValues: UseFormGetValues<ProviderFormData>
  watch: UseFormWatch<ProviderFormData>
}

function ProviderForm({
                        categories,
                        control,
                        errors,
                        images,
                        setImages,
                        files,
                        setFiles,
                        setValue,
                        getValues,
                        watch
                      }: Props) {
  const [subcategories, setSubcategories] = useState<ISubcategory[]>([])

  useEffect(() => {
    const selectedCategoryIds = getValues('category_ids')
    const selectedSubcategoryIds = getValues('subcategory_ids')
    const selectedCategories = categories.filter(category => selectedCategoryIds?.includes(category.id))
    let subcategories: ISubcategory[] = []
    selectedCategories.forEach((category) => {
      subcategories.push(...category.subcategories)
    })
    setSubcategories(subcategories)
    const selectedSubcategories = subcategories.filter(subcategory => selectedSubcategoryIds?.includes(subcategory.id))
    setValue('subcategory_ids', selectedSubcategories.map(({id}) => id))
  }, [watch('category_ids')])

  return (
    <>
      <FileUploader
        title="Выберите логотип"
        files={images}
        setFiles={setImages}
        errorMessage={errors.logo?.message}
        control={control}
        setValue={setValue}
        name="logo"
      />
      <TextFieldCustom
        name="name"
        control={control}
        label="Название"
        errorMessage={errors.name?.message}
        required
      />
      <TextFieldCustom
        name="description"
        control={control}
        label="Описание"
        errorMessage={errors.description?.message}
        textFieldProps={() => ({
          multiline: true,
          rows: 4,
        })}
      />
      <ModalFormControl errorMessage={errors.category_ids?.message}>
        <InputLabel id="select-category_ids">Категории</InputLabel>
        <Controller
          name="category_ids"
          control={control}
          render={({field}) => (
            <Select
              labelId="select-category_ids-label"
              id="select-category_ids"
              label="Категории"
              {...field}
              required={true}
              multiple
            >
              {categories.map(({id, name}) => (
                <MenuItem key={id} value={id}>{name}</MenuItem>
              ))}
            </Select>
          )}
        />
      </ModalFormControl>
      <ModalFormControl errorMessage={errors.subcategory_ids?.message}>
        <InputLabel id="select-subcategory_ids">Подкатегории</InputLabel>
        <Controller
          name="subcategory_ids"
          control={control}
          render={({field}) => (
            <Select
              labelId="select-subcategory_ids-label"
              id="select-subcategory_ids"
              label="Подкатегории"
              {...field}
              required={true}
              multiple
              onChange={(event) => {
                if (field.onChange) {
                  field.onChange(event)
                }
              }}
            >
              {subcategories.map(({id, name}) => (
                <MenuItem key={id} value={id}>{name}</MenuItem>
              ))}
            </Select>
          )}
        />
      </ModalFormControl>
      <FileUploader
        title="Прикрепить файл (Необязательно)"
        files={files}
        setFiles={setFiles}
        errorMessage={errors.file?.message}
        control={control}
        setValue={setValue}
        name="file"
        acceptFiles={{
          'image/*': ['.jpg', '.jpeg', '.png'],
          'application/*': ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.zip', '*.rar'],
        }}
        maxFileSize={100}
        acceptFilesText="*.jpg, *.jpeg, *.png, *.pdf, *.doc, *.docx, *.xls, *.xlsx, *.ppt, *.pptx, *.zip, *.rar"
      />
    </>
  )
}

export { ProviderForm }
