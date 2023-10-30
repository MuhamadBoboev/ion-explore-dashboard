import { Control, FieldErrors } from 'react-hook-form'
import TextFieldCustom from '@shared/ui/TextFieldCustom'
import { VacancyCategoryFormData } from '@modules/vacancyCategory/model/VacancyCategoryFormData'

interface Props {
  errors: FieldErrors<VacancyCategoryFormData>
  control: Control<VacancyCategoryFormData>
}

function VacancyCategoryForm({control, errors}: Props) {
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

export { VacancyCategoryForm }
