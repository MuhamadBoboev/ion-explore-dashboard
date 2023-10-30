import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form'
import { Dispatch, SetStateAction } from 'react'
import TextFieldCustom from '@shared/ui/TextFieldCustom'
import { FileUploader } from '@shared/ui/FileUploader'
import { ServiceFormData } from '@modules/service/model/services/ServiceFormData'

interface Props {
  errors: FieldErrors<ServiceFormData>
  control: Control<ServiceFormData>
  images: File[]
  setImages: Dispatch<SetStateAction<File[]>>
  setValue: UseFormSetValue<ServiceFormData>
}

function ServiceForm({control, errors, images, setImages, setValue}: Props) {

  return (
    <>
      <FileUploader
        title="Выберите изображению"
        files={images}
        setFiles={setImages}
        errorMessage={errors.image?.message}
        control={control}
        setValue={setValue}
        name="image"
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
        name="sku"
        control={control}
        label="Код услуги"
        errorMessage={errors.sku?.message}
        required
      />
      <TextFieldCustom
        name="price"
        control={control}
        label="Цена"
        errorMessage={errors.price?.message}
        typeNumber
      />
      <TextFieldCustom
        name="unit"
        control={control}
        label="Ед. измерения"
        errorMessage={errors.unit?.message}
      />
    </>
  )
}

export { ServiceForm }
