// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { useSettings } from '../../hooks/useSettings'

const FallbackSpinner = ({ sx }: { sx?: BoxProps['sx'] }) => {
  // ** Hook
  const { settings } = useSettings()

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
      <img
        src={`/images/logo-${settings.mode === 'light' ? 'full' : 'white'}.svg`}
        alt="PRO MEBEL"
      />
      <CircularProgress color="warning" disableShrink sx={{ mt: 6 }} />
    </Box>
  )
}

export default FallbackSpinner
