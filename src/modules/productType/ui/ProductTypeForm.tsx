import { Control, FieldErrors } from 'react-hook-form'
import TextFieldCustom from '@shared/ui/TextFieldCustom'
import { ProductTypeFormData } from '@modules/productType/model/ProductTypeFormData'

interface Props {
  errors: FieldErrors<ProductTypeFormData>
  control: Control<ProductTypeFormData>
}

function ProductTypeForm({control, errors}: Props) {
  return (
    <>
      <TextFieldCustom
        name="key"
        control={control}
        label="Название на английском"
        errorMessage={errors.key?.message}
        required
      />
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

export { ProductTypeForm }
