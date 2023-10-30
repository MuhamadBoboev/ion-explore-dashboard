import { Control, Controller, FieldErrors } from 'react-hook-form'
import TextFieldCustom from '@shared/ui/TextFieldCustom'
import ModalFormControl from '@shared/ui/ModalFormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { ShippingLocationFormData } from '@modules/shippingLocation/model/ShippingLocationFormData'

interface Props {
  errors: FieldErrors<ShippingLocationFormData>
  control: Control<ShippingLocationFormData>
}

function ShippingLocationForm({control, errors}: Props) {

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
        name="price"
        control={control}
        label="Цена *"
        errorMessage={errors.price?.message}
        typeNumber
      />
      <ModalFormControl errorMessage={errors.is_active?.message}>
        <FormControlLabel
          control={(
            <Controller
              control={control}
              render={({field}) => (
                <Switch
                  {...field}
                  checked={field.value}
                />
              )}
              name="is_active"
              defaultValue
            />
          )}
          label="Статус"
        />
      </ModalFormControl>
      <TextFieldCustom
        name="order"
        control={control}
        label="Порядок"
        errorMessage={errors.order?.message}
        typeNumber
      />
    </>
  )
}

export { ShippingLocationForm }
