import ModalFormControl from './ModalFormControl'
import { Control, Controller, ControllerRenderProps } from 'react-hook-form'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { FieldValues } from 'react-hook-form/dist/types'

export interface TextFieldCustomProps {
  errorMessage?: string
  name: string
  control: Control<any>
  label?: string
  controllerProps?: any
  typeNumber?: boolean
  required?: boolean
  textFieldProps?(field: ControllerRenderProps<FieldValues, string>): TextFieldProps
}

function TextFieldCustom({
  name,
  required = false,
  errorMessage,
  control,
  label,
  textFieldProps,
  controllerProps = {},
  typeNumber,
}: TextFieldCustomProps) {
  return (
    <ModalFormControl errorMessage={errorMessage}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            label={label}
            error={!!errorMessage}
            type={typeNumber ? 'number' : undefined}
            {...field}
            {...textFieldProps ? textFieldProps(field) : {}}
            onChange={(event) => {
              const props = textFieldProps ? textFieldProps(field) : {}
              // if (typeNumber) {
              //   event.target.value = event.target.value.replace(/\D/, '')
              // }
              if (props.onChange) {
                props.onChange(event)
              }
              if (field.onChange) {
                field.onChange(event)
              }
            }}
            required={required}
          />
        )}
        {...controllerProps}
      />
    </ModalFormControl>
  )
}

export default TextFieldCustom
