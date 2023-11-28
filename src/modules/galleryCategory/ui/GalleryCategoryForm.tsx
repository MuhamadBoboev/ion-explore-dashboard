import { Control, FieldErrors } from 'react-hook-form'
import TextFieldCustom from '@shared/ui/TextFieldCustom'
import { LangForm } from '@shared/ui/LangForm'
import { GalleryCategoryFormData } from '@modules/galleryCategory/model/GalleryCategoryFormData'

interface Props {
  errors: FieldErrors<GalleryCategoryFormData>
  control: Control<GalleryCategoryFormData>
}

function GalleryCategoryForm({control, errors}: Props) {

  return (
    <>
      <TextFieldCustom
        name="name"
        control={control}
        label="Название"
        errorMessage={errors.name?.message}
        required
      />
      <LangForm
        control={control}
        errorMessage={errors.lang_id?.message}
      />
    </>
  )
}

export { GalleryCategoryForm }
