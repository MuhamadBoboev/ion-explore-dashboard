import { ImageList } from '@mui/material'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { SpecialistImageModals } from './SpecialistImageModals'
import { SpecialistImage } from './SpecialistImage'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import Loader from '@shared/ui/Loader'
import { useSpecialistImageStore } from '@modules/specialist/model/specialistsImage/store'
import { ISpecialist } from 'src/modules/specialist'
import { useRouter } from 'next/router'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import CustomCard from '@shared/ui/CustomCard'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import CustomPageHeader from '@shared/ui/CustomPageHeader'

function SpecialistImages() {
  const router = useRouter()
  const {
    data: specialist,
    mutate,
    isLoading,
    isValidating,
  } = useSWR<{ data: ISpecialist }>(`/specialists/${router.query.slug}`, getFetcher)
  const { trigger, isMutating } = useSWRMutation('/specialist-images', deleteFetcher)
  const [handleCreateOpen] = useSpecialistImageStore(({ handleCreateOpen }) => [handleCreateOpen])

  if (isLoading || isValidating || isMutating) {
    return <Loader />
  }

  if (!specialist) {
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
            href="/main/specialists"
            component={Link}
          >
            <Icon icon="ep:back" />
          </IconButton>
          Галерея "{specialist.data.name || ''}"
        </>}
        buttonName="Добавить изображение"
      />
      <Box p={8}>
        {/* <ImageList sx={{width: '100%', height: 'auto'}}>
          {specialist.data.images.map(image => (
            <SpecialistImage
              image={image}
              trigger={trigger}
              mutate={mutate}
            />
          ))}
        </ImageList> */}
      </Box>
      <SpecialistImageModals
        mutate={mutate}
        specialistId={specialist.data.id}
      />
    </CustomCard>
  )
}

export { SpecialistImages }
