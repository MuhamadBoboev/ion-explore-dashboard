// ** React Imports
import { FC, Fragment, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { styled, useTheme } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'
import DropzoneWrapper from '../../../@core/styles/libs/react-dropzone'
import { FileUploaderProps } from '@shared/ui/FileUploader/FileUploaderProps'
import { Controller } from 'react-hook-form'

interface FileProp {
  name: string
  type: string
  size: number
}

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  width: 48,
  height: 48,
  marginBottom: theme.spacing(8.5)
}))

const defaultAcceptValues = {
  'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.svg']
}

const defaultAcceptFilesText = '*.jpeg, *.jpg, *.png, *.gif, *.svg'

const FileUploader: FC<FileUploaderProps> = ({
  title = 'Перетащите файл или нажмите чтобы загрузить',
  name,
  control,
  setValue,
  files,
  setFiles,
  acceptFiles = defaultAcceptValues,
  errorMessage,
  maxFileSize = 2,
  maxFiles = 1,
  acceptFilesText = defaultAcceptFilesText,
}) => {

  // ** Hooks
  const theme = useTheme()
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles,
    maxSize: maxFileSize * (10 ** 6),
    accept: acceptFiles,
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    },
    onDropRejected: (fileRejections, event) => {
      // console.log(fileRejections)
      if (fileRejections && fileRejections[0]) {
        if (fileRejections[0].errors[0] || fileRejections[0].errors[1]) {
          if (fileRejections[0].errors[0].code === 'file-invalid-type') {
            toast.error('Неправильный тип файла')
          } else {
            toast.error(`Вы можете выбирать только ${maxFiles} файл с размером ${maxFileSize}MB`, {
              duration: 2000
            })
          }
          if (fileRejections[0].errors[1].code === 'file-invalid-type') {
            toast.error('Неправильный тип файла')
          }
        }
      } else {
        toast.error(`Вы можете выбирать только ${maxFiles} файл с размером ${maxFileSize}MB`, {
          duration: 2000
        })
      }
    }
  })

  const renderFilePreview = (file: FileProp) => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file as any)} />
    } else {
      return <Icon icon="tabler:file-description" />
    }
  }

  const handleRemoveFile = (file: FileProp) => {
    const filtered = files.filter((i: FileProp) => i.name !== file.name)
    setFiles([...filtered])
  }

  const fileList = files.map((file: FileProp) => (
    <ListItem key={file.name}>
      <div className="file-details">
        <div className="file-preview">{renderFilePreview(file)}</div>
        <div>
          <Typography className="file-name">{file.name}</Typography>
          <Typography className="file-size" variant="body2">
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <Icon icon="tabler:x" fontSize={20} />
      </IconButton>
    </ListItem>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  useEffect(() => {
    if (files[0]) {
      setValue(name, files[0].name)
    } else {
      setValue(name, undefined)
    }
  }, [files])

  return (
    <Box sx={{ mb: 5 }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            type="hidden"
            multiple
            {...field}
          />
        )}
      />
      <DropzoneWrapper {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Img alt="Upload img" src={`/images/misc/upload-${theme.palette.mode}.png`} />
          <Typography variant="h5" sx={{ mb: 2.5 }}>
            {title}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Форматы: {acceptFilesText}</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Максимальное кол-во файлов {maxFiles}<br />
            Максимальный размер каждого файла {maxFileSize} MB
          </Typography>
        </Box>
        {errorMessage && <Typography
          variant="caption"
          color={theme.palette.error.main}
          textAlign="center"
          sx={{
            flexBasis: '100%',
          }}
        >
          {errorMessage.toString()}
        </Typography>}
      </DropzoneWrapper>
      {files.length ? (
        <Fragment>
          <List>{fileList}</List>
          <div className="buttons">
            <Button color="error" variant="outlined" onClick={handleRemoveAllFiles}>
              Очистить
            </Button>
          </div>
        </Fragment>
      ) : null}
    </Box>
  )
}

export { FileUploader }
