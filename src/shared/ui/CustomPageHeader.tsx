import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import { ReactNode } from 'react'

interface CustomPageHeaderProps {
  withButton?: boolean
  title: ReactNode | string
  buttonName?: string
  rightContent?: ReactNode
  leftContent?: ReactNode
  handleOpen?: () => void
}

function MainBannersHeader({
  buttonName,
  title,
  rightContent,
  leftContent,
  withButton = true,
  handleOpen,
}: CustomPageHeaderProps) {
  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item>
        <CardHeader title={title} />
        {leftContent}
      </Grid>
      <Grid item>
        {withButton && <Button
          variant="contained"
          sx={{ marginRight: 5 }}
          onClick={handleOpen}
        >
          {buttonName || 'Добавить'}
        </Button>}
        {rightContent}
      </Grid>
    </Grid>
  )
}

export default MainBannersHeader
