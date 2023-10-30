import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form'
import { Dispatch, SetStateAction } from 'react'
import { FileUploader } from '@shared/ui/FileUploader'
import { SpecialistImageFormData } from '@modules/specialist/model/specialistsImage/SpecialistImageFormData'
import TextFieldCustom from '@shared/ui/TextFieldCustom'

interface Props {
  errors: FieldErrors<SpecialistImageFormData>
  control: Control<SpecialistImageFormData>
  images: File[]
  setImages: Dispatch<SetStateAction<File[]>>
  setValue: UseFormSetValue<SpecialistImageFormData>
}

function SpecialistImageForm({images, setImages, setValue, errors, control}: Props) {
  return (
    <>
      <TextFieldCustom
        name="title"
        control={control}
        label="Заголовок"
        errorMessage={errors.title?.message}
      />
      <FileUploader
        title="Выберите изображение *"
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

export { SpecialistImageForm }
