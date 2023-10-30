import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form'
import { Dispatch, SetStateAction } from 'react'
import { FileUploader } from '@shared/ui/FileUploader'
import TextFieldCustom from '@shared/ui/TextFieldCustom'
import { ProjectImageFormData } from '@modules/project/model/projectImages/ProjectImageFormData'

interface Props {
  errors: FieldErrors<ProjectImageFormData>
  control: Control<ProjectImageFormData>
  images: File[]
  setImages: Dispatch<SetStateAction<File[]>>
  setValue: UseFormSetValue<ProjectImageFormData>
}

function ProjectImageForm({images, setImages, setValue, errors, control}: Props) {
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

export { ProjectImageForm }
