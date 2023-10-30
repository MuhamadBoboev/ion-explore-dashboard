import { ImageList } from '@mui/material'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { ServiceImageModals } from './ServiceImageModals'
import { ServiceImage } from './ServiceImage'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import Loader from '@shared/ui/Loader'
import { useRouter } from 'next/router'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import CustomCard from '@shared/ui/CustomCard'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { useServiceImageStore } from '@modules/service/model/serviceImages/store'
import { IService } from '@modules/service/model/services/IService'

function ServiceImages() {
  const router = useRouter()
  const {
    data: service,
    mutate,
    isLoading,
    isValidating,
  } = useSWR<{ data: IService }>(`/services/${router.query.slug}`, getFetcher)
  const {trigger, isMutating} = useSWRMutation('/service-images', deleteFetcher)
  const [handleCreateOpen] = useServiceImageStore(({handleCreateOpen}) => [handleCreateOpen])

  if (isLoading || isValidating || isMutating) {
    return <Loader/>
  }

  if (!service) {
    return null
  }

  return (
    <CustomCard>
      <CustomPageHeader
        handleOpen={handleCreateOpen}
        title={<>
          <IconButton
            title="Назад"
            sx={{mr: 4}}
            href="/main/services"
            component={Link}
          >
            <Icon icon="ep:back"/>
          </IconButton>
          Галерея "{service.data.name || ''}"
        </>}
        buttonName="Добавить изображение"
      />
      <Box p={8}>
        <ImageList sx={{width: '100%', height: 'auto'}}>
          {service.data.images.map(image => (
            <ServiceImage
              image={image}
              trigger={trigger}
              mutate={mutate}
            />
          ))}
        </ImageList>
      </Box>
      <ServiceImageModals
        mutate={mutate}
        serviceId={service.data.id}
      />
    </CustomCard>
  )
}

export { ServiceImages }
