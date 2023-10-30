import { Dispatch, SetStateAction } from 'react'
import TextFieldCustom, { TextFieldCustomProps } from './TextFieldCustom'

interface FileFieldCustomProps extends TextFieldCustomProps {
  setImage: Dispatch<SetStateAction<File | null>>
}

function FileFieldCustom({
  textFieldProps,
  controllerProps,
  control,
  name,
  setImage,
  label,
  errorMessage
}: FileFieldCustomProps) {
  return (
    <TextFieldCustom
      name={name}
      control={control}
      textFieldProps={(field) => {
        return {
          ...textFieldProps ? textFieldProps(field) : {},
          type: 'file',
          onChange: (event) => {
            field.onChange && field.onChange(event)
            if ('files' in event.target) {
              if (event.target.files) {
                setImage(event.target.files[0])
              }
            }
          }
        }
      }}
      label={label}
      controllerProps={controllerProps}
      errorMessage={errorMessage}
    />
  )
}

export default FileFieldCustom
