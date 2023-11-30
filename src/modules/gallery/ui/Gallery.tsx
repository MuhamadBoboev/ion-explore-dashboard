import { IconButton, ImageList } from '@mui/material'
import useSWR, { KeyedMutator } from 'swr'
import useSWRMutation from 'swr/mutation'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import Loader from '@shared/ui/Loader'
import CustomCard from '@shared/ui/CustomCard'
import Box from '@mui/material/Box'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { IGalleryCategory } from '@modules/galleryCategory'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useGalleryStore } from '@modules/gallery/model/store'
import { GalleryImage } from '@modules/gallery/ui/GalleryImage'
import { GalleryModals } from '@modules/gallery/ui/GalleryModals'
import { IGallery } from '../model/IGallery'
import { ITour } from '@modules/provider'
import { useLanguageStore } from '@shared/model/store'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { useRouter } from 'next/router'

interface Props {
  // tour?: ITour
  // mutate: KeyedMutator<any>
}

function Gallery() {
  const { trigger, isMutating } = useSWRMutation('/gallery', deleteFetcher)
  const [handleCreateOpen] = useGalleryStore(({ handleCreateOpen }) => [handleCreateOpen])
  const lang = useLanguageStore(({ langList, lang }) => langList.find((el) => el.code === lang))
  // debugger
  const router = useRouter()
  const {
    data: tour,
    isLoading,
    isValidating,
    error,
    mutate,
  } = useSWR<ITour>(`/tour/${router.query.id}?lang=${lang?.code}`, getFetcher)
  // console.log(tour)
  if (isMutating) {
    return <Loader />
  }
  // console.log(tour)
  if (!tour) {
    return null
  }
  return (
    <CustomCard>
      <CustomPageHeader
        handleOpen={handleCreateOpen}
        title={<>
          <IconButton
            title="Назад"
            sx={{ mr: 4 }}
            href="/main/tour"
            component={Link}
          >
            <Icon icon="ep:back" />
          </IconButton>
          Изображении "{tour?.name || ''}"
        </>}
        buttonName="Добавить изображение"
      />
      <Box p={8}>
        <ImageList sx={{ width: '100%', height: 'auto' }}>
          {tour.gallery.map(image => (
            <GalleryImage
              imageItem={image as IGallery}
              trigger={trigger}
              mutate={mutate}
            />
          ))}
        </ImageList>
      </Box>
      <GalleryModals mutate={mutate} />
    </CustomCard>
  )
}

export { Gallery }
