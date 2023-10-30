import { DialogTitle } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon'
import { ReactNode } from 'react'

export interface DialogTitleProps {
  children?: ReactNode
  onClose?: any
}

function CustomDialogTitle(props: DialogTitleProps) {
  const {children, onClose, ...other} = props

  return (
    <DialogTitle {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 12,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon/>
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

export default CustomDialogTitle