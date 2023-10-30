import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress'


function Loader(props: CircularProgressProps) {
  return (
    <CircularProgress
      size={50}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
      {...props}
    />
  )
}

export default Loader