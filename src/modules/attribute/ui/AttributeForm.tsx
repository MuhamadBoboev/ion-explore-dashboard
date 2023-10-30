import { Control, FieldErrors } from 'react-hook-form'
import TextFieldCustom from '@shared/ui/TextFieldCustom'
import { AttributeFormData } from '@modules/attribute/model/AttributeFormData'

interface Props {
  errors: FieldErrors<AttributeFormData>
  control: Control<AttributeFormData>
}

function AttributeForm({control, errors}: Props) {
  return (
    <>
      <TextFieldCustom
        name="name"
        control={control}
        label="Название"
        errorMessage={errors.name?.message}
        required
      />
      <TextFieldCustom
        name="unit"
        control={control}
        label="Единица измерения"
        errorMessage={errors.unit?.message}
      />
    </>
  )
}

export { AttributeForm }
