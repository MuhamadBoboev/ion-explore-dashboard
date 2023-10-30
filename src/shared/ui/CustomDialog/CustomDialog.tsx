import CustomDialogTitle from './CustomDialogTitle'
import { Dialog, DialogContent, DialogProps } from '@mui/material'

interface Props extends DialogProps {
  title: string
  handleClose(): void
}

type CustomDialogProps = Omit<Props, 'open'> & {
  open?: boolean
}

function CustomDialog({ title, children, handleClose, ...props }: CustomDialogProps) {
  return (
    <Dialog
      fullWidth={true}
      onClose={handleClose}
      scroll="body"
      {...props}
      open={true}
    >
      <CustomDialogTitle onClose={handleClose}>
        {title}
      </CustomDialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default CustomDialog
