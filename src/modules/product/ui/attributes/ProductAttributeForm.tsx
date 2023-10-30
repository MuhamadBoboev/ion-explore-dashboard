import { Control, Controller, FieldErrors } from 'react-hook-form'
import TextFieldCustom from '@shared/ui/TextFieldCustom'
import { IAttribute } from '@modules/attribute'
import InputLabel from '@mui/material/InputLabel'
import { Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import ModalFormControl from '@shared/ui/ModalFormControl'
import { ProductAttributeFormData } from '@modules/product/model/attributes/ProductAttributeFormData'

interface Props {
  attributes: IAttribute[]
  errors: FieldErrors<ProductAttributeFormData>
  control: Control<ProductAttributeFormData>
}

function ProductAttributeForm({attributes, control, errors}: Props) {
  return (
    <>
      <ModalFormControl errorMessage={errors.attribute_id?.message}>
        <InputLabel id="select-attribute">Атрибут *</InputLabel>
        <Controller
          name="attribute_id"
          control={control}
          render={({field}) => (
            <Select
              labelId="select-attribute-label"
              id="select-attribute"
              label="Атрибут *"
              {...field}
              required
            >
              {attributes.map(({id, name, unit}) => (
                <MenuItem key={id} value={id}>
                  {name}&nbsp;
                  {unit ? `( ${unit} )` : null}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </ModalFormControl>
      <TextFieldCustom
        name="value"
        control={control}
        label="Значение"
        errorMessage={errors.value?.message}
        required
      />
      <TextFieldCustom
        name="price"
        control={control}
        label="Цена"
        errorMessage={errors.price?.message}
        required
        typeNumber
      />
      <TextFieldCustom
        name="quantity"
        control={control}
        label="Количество"
        errorMessage={errors.quantity?.message}
        required
        typeNumber
      />
      <TextFieldCustom
        name="sku"
        control={control}
        label="Артикул"
        errorMessage={errors.sku?.message}
        required
      />
    </>
  )
}

export { ProductAttributeForm }
