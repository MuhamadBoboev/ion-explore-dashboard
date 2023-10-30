import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form'
import { Dispatch, SetStateAction } from 'react'
import TextFieldCustom from '@shared/ui/TextFieldCustom'
import { FileUploader } from '@shared/ui/FileUploader'
import { ProjectFormData } from '@modules/project/model/projects/ProjectFormData'

interface Props {
  errors: FieldErrors<ProjectFormData>
  control: Control<ProjectFormData>
  images: File[]
  setImages: Dispatch<SetStateAction<File[]>>
  setValue: UseFormSetValue<ProjectFormData>
}

function ProjectForm({control, errors, images, setImages, setValue}: Props) {

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
        name="title"
        control={control}
        label="Заголовок"
        errorMessage={errors.title?.message}
        required
      />
      <TextFieldCustom
        name="short_description"
        control={control}
        label="Крат. описание"
        errorMessage={errors.short_description?.message}
        textFieldProps={() => ({
          multiline: true,
          rows: 4,
        })}
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
    </>
  )
}

export { ProjectForm }
