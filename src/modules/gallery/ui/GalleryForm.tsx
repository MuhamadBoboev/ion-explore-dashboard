import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form'
import { Dispatch, SetStateAction } from 'react'
import { FileUploader } from '@shared/ui/FileUploader'
import TextFieldCustom from '@shared/ui/TextFieldCustom'
import { GalleryFormData } from '@modules/gallery/model/GalleryFormData'

interface Props {
  errors: FieldErrors<GalleryFormData>
  control: Control<GalleryFormData>
  images: File[]
  setImages: Dispatch<SetStateAction<File[]>>
  setValue: UseFormSetValue<GalleryFormData>
}

function GalleryForm({ images, setImages, setValue, errors, control }: Props) {
  return (
    <>
      <TextFieldCustom
        name="author"
        control={control}
        label="Автор"
        errorMessage={errors.author?.message}
        required
      />
      <TextFieldCustom
        name="location"
        control={control}
        label="Локация"
        errorMessage={errors.location?.message}
        required
      />
      <FileUploader
        title="Выберите изображение *"
        files={images}
        setFiles={setImages}
        errorMessage={errors.image?.message}
        control={control}
        setValue={setValue}
        name="img"
      />
    </>
  )
}

export { GalleryForm }
