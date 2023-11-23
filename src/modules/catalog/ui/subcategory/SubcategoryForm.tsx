import { Control, Controller, FieldErrors, UseFormSetValue } from 'react-hook-form'
import TextFieldCustom from '@shared/ui/TextFieldCustom'
import { SubcategoryFormData } from '@modules/catalog/model/subcategory/SubcategoryFormData'
import InputLabel from '@mui/material/InputLabel'
import { Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import ModalFormControl from '@shared/ui/ModalFormControl'
import { FileUploader } from '@shared/ui/FileUploader'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  errors: FieldErrors<SubcategoryFormData>
  control: Control<SubcategoryFormData>
  icons: File[]
  setIcons: Dispatch<SetStateAction<File[]>>
  setValue: UseFormSetValue<SubcategoryFormData>
}

function SubcategoryForm({ control, errors, setIcons, setValue, icons }: Props) {

  return (
    <>
      <FileUploader
        title="Выберите иконку"
        files={icons}
        setFiles={setIcons}
        errorMessage={errors.icon?.message}
        control={control}
        setValue={setValue}
        name="icon"
      />
      <TextFieldCustom
        name="name"
        control={control}
        label="Название"
        errorMessage={errors.name?.message}
        required
      />
      {/* <TextFieldCustom
        name="category_id"
        control={control}
        label="Название"
        errorMessage={errors.category_id?.message}
        required
      /> */}
      {/* <TextFieldCustom
        name="description"
        control={control}
        label="Описание"
        errorMessage={errors.description?.message}
        textFieldProps={() => ({
          multiline: true,
          rows: 4,
        })}
      /> */}
      {/* <ModalFormControl errorMessage={errors.service_ids?.message}>
        <InputLabel id="select-service_ids">Доступные услуги</InputLabel>
        <Controller
          name="service_ids"
          control={control}
          render={({field}) => (
            <Select
              labelId="select-service_ids-label"
              id="select-service_ids"
              label="Доступные услуги"
              {...field}
              required={true}
              multiple
            >
              {services.map(({id, name}) => (
                <MenuItem key={id} value={id}>{name}</MenuItem>
              ))}
            </Select>
          )}
        />
      </ModalFormControl> */}
      {/* <TextFieldCustom
        name="order"
        control={control}
        label="Порядок"
        errorMessage={errors.order?.message}
        typeNumber
      /> */}
    </>
  )
}

export { SubcategoryForm }
