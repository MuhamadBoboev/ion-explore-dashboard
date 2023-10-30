import { styled } from '@mui/material/styles'
import { Dispatch, SetStateAction, useState } from 'react'
import TextField from '@mui/material/TextField'
import { Control, Controller } from 'react-hook-form'
import Button from '@mui/material/Button'
import Image from 'next/image'
import ModalFormControl from '@shared/ui/ModalFormControl'

interface Props {
  urlImage: string
  image: File | null
  errorMessage?: any
  control: Control<any>
  setImage: Dispatch<SetStateAction<File | null>>
}

const StyledContainer = styled('div')(({theme}) => ({
  width: '100%',
  height: '400px',
  border: `1px solid ${theme.palette.grey['700']}`,
  borderRadius: '6px',
  padding: '12px',
  marginBottom: 34,
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, .4)',
    transition: 'all 250ms',
    opacity: 0,
    pointerEvents: 'none',
  },
  '&:hover': {
    '&::after': {
      opacity: 1,
    }
  },
  '&:active': {
    border: `1.5px solid ${theme.palette.primary.main}`
  }
}))

const StyledImage = styled(Image)(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
}))

const StyledInput = styled(TextField)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  height: '100%',
  opacity: 0,
  '& .MuiInputBase-root': {
    height: '100%'
  },
  '& .MuiInputBase-input': {
    height: '100%',
    cursor: 'pointer',
  }
}))

function ImageContainer({image, urlImage, setImage, errorMessage, control}: Props) {
  const [img, setImg] = useState(urlImage)

  return (
    <StyledContainer>
      <StyledImage
        src={img}
        alt=""
        width={500}
        height={400}
        quality={100}
      />
      {image && <Button
        variant="outlined"
        sx={{
          position: 'absolute',
          bottom: 40,
          right: 40,
          zIndex: 2,
        }}
        onClick={() => {
          setImage(null)
          setImg(urlImage)
        }}
      >
        Очистить
      </Button>}
      <ModalFormControl
        errorMessage={errorMessage}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: '100%',
        }}
      >
        <Controller
          name="image"
          control={control}
          render={({field}) => (
            <StyledInput
              {...field}
              name="image"
              type="file"
              onChange={(event: any) => {
                field.onChange && field.onChange()
                const [file]: any = event.target.files
                if (file) {
                  setImg(URL.createObjectURL(file))
                  setImage(file)
                }
              }}
            />
          )}
        />
      </ModalFormControl>
    </StyledContainer>
  )
}

export default ImageContainer
