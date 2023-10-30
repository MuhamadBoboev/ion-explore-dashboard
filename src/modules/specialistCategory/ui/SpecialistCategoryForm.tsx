import { Control, FieldErrors } from 'react-hook-form'
import TextFieldCustom from '@shared/ui/TextFieldCustom'
import { SpecialistCategoryFormData } from '@modules/specialistCategory/model/SpecialistCategoryFormData'

interface Props {
  errors: FieldErrors<SpecialistCategoryFormData>
  control: Control<SpecialistCategoryFormData>
}

function SpecialistCategoryForm({control, errors}: Props) {
  return (
    <>
      <TextFieldCustom
        name="name"
        control={control}
        label="Название"
        errorMessage={errors.name?.message}
        required
      />
    </>
  )
}

export { SpecialistCategoryForm }
