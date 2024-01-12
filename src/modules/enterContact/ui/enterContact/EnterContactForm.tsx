import { Control, FieldErrors } from 'react-hook-form'
import TextFieldCustom from '@shared/ui/TextFieldCustom'
import { EnterContactFormData } from '@modules/enterContact/model/enterContacts/enterContactFormData'

interface Props {
  errors: FieldErrors<EnterContactFormData>
  control: Control<EnterContactFormData>

}

function EnterContactForm({ control, errors }: Props) {


  return (
    <>
      <TextFieldCustom
        name="address"
        control={control}
        label="Адресс"
        errorMessage={errors.address?.message}
        required
      />
      <TextFieldCustom
        name="phone"
        control={control}
        label="Телефон"
        errorMessage={errors.phone?.message}
        required
      />
      <TextFieldCustom
        name="whatsapp"
        control={control}
        label="Whatsapp"
        errorMessage={errors.whatsapp?.message}
        required
      />
      <TextFieldCustom
        name="latitude"
        control={control}
        label="latitude"
        errorMessage={errors.latitude?.message}
        required
      />
      <TextFieldCustom
        name="longitude"
        control={control}
        label="longitude"
        errorMessage={errors.longitude?.message}
        required
      />

    </>
  )
}

export { EnterContactForm }
