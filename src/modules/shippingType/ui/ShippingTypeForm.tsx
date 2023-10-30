import { Control, Controller, FieldErrors, UseFormSetValue } from 'react-hook-form'
import { Dispatch, SetStateAction } from 'react'
import TextFieldCustom from '@shared/ui/TextFieldCustom'
import ModalFormControl from '@shared/ui/ModalFormControl'
import { FileUploader } from '@shared/ui/FileUploader'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { ShippingTypeFormData } from '@modules/shippingType/model/ShippingTypeFormData'

interface Props {
  errors: FieldErrors<ShippingTypeFormData>
  control: Control<ShippingTypeFormData>
  images: File[]
  setImages: Dispatch<SetStateAction<File[]>>
  setValue: UseFormSetValue<ShippingTypeFormData>
}

function ShippingTypeForm({control, errors, images, setImages, setValue}: Props) {

  return (
    <>
      <FileUploader
        title="Выберите иконку"
        files={images}
        setFiles={setImages}
        errorMessage={errors.icon?.message}
        control={control}
        setValue={setValue}
        name="icon"
      />
      <TextFieldCustom
        name="key"
        control={control}
        label="Название на английском"
        errorMessage={errors.key?.message}
        required
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
      <TextFieldCustom
        name="price"
        control={control}
        label="Цена"
        errorMessage={errors.price?.message}
        typeNumber
      />
      <ModalFormControl errorMessage={errors.is_active?.message}>
        <FormControlLabel
          control={(
            <Controller
              control={control}
              render={({field}) => (
                <Switch
                  {...field}
                  checked={field.value}
                />
              )}
              name="is_active"
              defaultValue={true}
            />
          )}
          label="Статус"
        />
      </ModalFormControl>
    </>
  )
}

export { ShippingTypeForm }
