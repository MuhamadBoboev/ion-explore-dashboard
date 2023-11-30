import { ImageListItem, ImageListItemBar } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Icon } from '@iconify/react'
import toast from 'react-hot-toast'
import { KeyedMutator } from 'swr'
import { IGallery } from '@modules/gallery'
import { useGalleryStore } from '@modules/gallery/model/store'

interface Props {
  imageItem: IGallery
  trigger: any
  mutate: KeyedMutator<any>
}

function GalleryImage({ imageItem, trigger, mutate }: Props) {
  const [handleUpdateOpen] = useGalleryStore(
    ({ handleUpdateOpen }) => [handleUpdateOpen]
  )
  const { id, img } = imageItem
  return (
    <ImageListItem
      key={id}
      sx={{
        height: '300px !important'
      }}
    >
      <img
        src={img ?? (imageItem as any).imageItem}
        alt=""
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <ImageListItemBar
        title={id}
        actionIcon={(
          <>
            <LoadingButton
              sx={{ color: 'rgba(255, 255, 255, 0.54)', marginRight: 2, minWidth: 0, padding: '8px' }}
              onClick={() => {
                handleUpdateOpen(imageItem)
              }}
            >
              <Icon icon="material-symbols:edit" fontSize={20} />
            </LoadingButton>
            <LoadingButton
              size="large"
              sx={{ color: 'rgba(255, 255, 255, 0.54)', marginRight: 2, minWidth: 0, padding: '8px' }}
              onClick={async () => {
                try {
                  await trigger(id)
                  await mutate()
                  toast.success('Успешно удалена')
                } catch (e) {
                  toast.error('Произошла ошибка')
                }
              }}
            >
              <Icon icon="humbleicons:times" fontSize={20} />
            </LoadingButton>
          </>
        )}
      />
    </ImageListItem>
  )
}

export { GalleryImage }
