import { Control, Controller, FieldErrors, UseFormSetValue } from 'react-hook-form'
import { Dispatch, SetStateAction } from 'react'
import TextFieldCustom from '@shared/ui/TextFieldCustom'
import { FileUploader } from '@shared/ui/FileUploader'
import { SpecialistFormData } from '@modules/specialist/model/specialists/SpecialistFormData'
import { LangForm } from '@shared/ui/LangForm'

interface Props {
  errors: FieldErrors<SpecialistFormData>
  control: Control<SpecialistFormData>
  images: File[]
  setImages: Dispatch<SetStateAction<File[]>>
  setValue: UseFormSetValue<SpecialistFormData>
}

function SpecialistForm({ control, errors, images, setImages, setValue }: Props) {

  return (
    <>
      <FileUploader
        title="Выберите аватарку"
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
        label="Имя"
        errorMessage={errors.name?.message}
        required
      />
      <TextFieldCustom
        name="description"
        control={control}
        label="Описание"
        errorMessage={errors.description?.message}
      />
      <TextFieldCustom
        name="speciality"
        control={control}
        label="Специальность"
        errorMessage={errors.speciality?.message}
        required
      />
      <LangForm control={control} errorMessage={errors.lang_id?.message} />
    </>
  )
}

export { SpecialistForm }
