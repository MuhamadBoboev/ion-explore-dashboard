import { FC, ReactNode } from 'react'
import FormControl from '@mui/material/FormControl'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { FormControlTypeMap } from '@mui/material/FormControl/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

interface ModalFormControlProps {
  errorMessage?: string
  children: ReactNode
}

const ModalFormControl: FC<ModalFormControlProps> | OverridableComponent<FormControlTypeMap> =
  ({errorMessage, children, ...props}) => (
    <FormControl
      fullWidth
      sx={{mb: 4}}
      {...props}
    >
      {children}
      {errorMessage && <FormHelperText sx={{color: 'error.main'}}>{errorMessage}</FormHelperText>}
    </FormControl>
  )

export default ModalFormControl