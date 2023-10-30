import { ImageListItem, ImageListItemBar } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Icon } from '@iconify/react'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { KeyedMutator } from 'swr'
import { ISpecialistImage } from '@modules/specialist/model/specialistsImage/ISpecialistImage'
import { useSpecialistImageStore } from '@modules/specialist/model/specialistsImage/store'

interface Props {
  image: ISpecialistImage
  trigger: any,
  mutate: KeyedMutator<any>
}

function SpecialistImage({image, trigger, mutate}: Props) {
  const [handleUpdateOpen] = useSpecialistImageStore(
    ({handleUpdateOpen}) => [handleUpdateOpen]
  )
  const {id, image: url, title} = image
  return (
    <ImageListItem
      key={id}
      sx={{
        height: '300px !important'
      }}
    >
      <img
        src={url}
        alt=""
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <ImageListItemBar
        title={title}
        actionIcon={(
          <>
            <LoadingButton
              sx={{color: 'rgba(255, 255, 255, 0.54)', marginRight: 2, minWidth: 0, padding: '8px'}}
              onClick={() => {
                handleUpdateOpen(image)
              }}
            >
              <Icon icon="material-symbols:edit" fontSize={20}/>
            </LoadingButton>
            <LoadingButton
              size="large"
              sx={{color: 'rgba(255, 255, 255, 0.54)', marginRight: 2, minWidth: 0, padding: '8px'}}
              onClick={async () => {
                try {
                  const response = await trigger(id)
                  await mutate()
                  toast.success(response.message)
                } catch (e) {
                  const error = e as AxiosError<{message: string}>
                  toast.error(error.response?.data?.message || 'Произошла ошибка')
                }
              }}
            >
              <Icon icon="humbleicons:times" fontSize={20}/>
            </LoadingButton>
          </>
        )}
      />
    </ImageListItem>
  )
}

export { SpecialistImage }
