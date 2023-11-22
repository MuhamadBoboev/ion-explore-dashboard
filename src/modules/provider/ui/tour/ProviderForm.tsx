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
import { LangForm } from '@shared/ui/LangForm'

interface Props {
  errors: FieldErrors<ProviderFormData>
  control: Control<ProviderFormData>
  images: File[]
  setImages: Dispatch<SetStateAction<File[]>>
  // files: File[]
  // setFiles: Dispatch<SetStateAction<File[]>>
  setValue: UseFormSetValue<ProviderFormData>
  categories: ISubcategory[]
  getValues: UseFormGetValues<ProviderFormData>
  watch: UseFormWatch<ProviderFormData>
}

function ProviderForm({
  categories,
  control,
  errors,
  images,
  setImages,
  // files,
  // setFiles,
  setValue,
  getValues,
  watch
}: Props) {
  // console.log(control)
  return (
    <>
      <FileUploader
        title="Выберите логотип"
        files={images}
        setFiles={setImages}
        errorMessage={errors.image?.message}
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
      <LangForm errorMessage={errors.lang_id?.message} control={control} />
      {/* <ModalFormControl errorMessage={errors.category_ids?.message}>
        <InputLabel id="subcategory_id">Категории</InputLabel>
        <Controller
          name="category_ids"
          control={control}
          render={({ field }) => (
            <Select
              labelId="subcategory_id-label"
              id="subcategory_id"
              label="Категории"
              {...field}
              required={true}
              multiple
            >
              {categories.map(({ id, name }) => (
                <MenuItem key={id} value={id}>{name}</MenuItem>
              ))}
            </Select>
          )}
        />
      </ModalFormControl> */}
      <ModalFormControl errorMessage={errors.subcategory?.message}>
        <InputLabel id="subcategory">Подкатегории</InputLabel>
        <Controller
          name="subcategory"
          control={control}
          render={({ field }) => (
            <Select
              labelId="select-subcategorys-label"
              id="subcategory"
              label="Подкатегории"
              {...field}
              required={true}
              onChange={(event) => {
                if (field.onChange) {
                  field.onChange(event)
                }
              }}
            >
              {categories.map(({ id, name }) => (
                <MenuItem key={id} value={id}>{name}</MenuItem>
              ))}
            </Select>
          )}
        />
      </ModalFormControl>
      {/* <FileUploader
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
      /> */}
    </>
  )
}

export { ProviderForm }
