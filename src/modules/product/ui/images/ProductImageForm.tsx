import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form'
import { ProductImageFormData } from '@modules/product/model/images/ProductImageFormData'
import { Dispatch, SetStateAction } from 'react'
import TextFieldCustom from '@shared/ui/TextFieldCustom'
import { FileUploader } from '@shared/ui/FileUploader'

interface Props {
  errors: FieldErrors<ProductImageFormData>
  control: Control<ProductImageFormData>
  images: File[]
  setImages: Dispatch<SetStateAction<File[]>>
  setValue: UseFormSetValue<ProductImageFormData>
}

function ProductImageForm({images, setImages, setValue, errors, control}: Props) {
  return (
    <>
      <TextFieldCustom
        name="title"
        control={control}
        label="Заголовок"
        errorMessage={errors.title?.message}
      />
      <FileUploader
        title="Выберите изображение"
        files={images}
        setFiles={setImages}
        errorMessage={errors.image?.message}
        control={control}
        setValue={setValue}
        name="image"
      />
    </>
  )
}

export { ProductImageForm }
