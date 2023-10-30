import { ImageList } from '@mui/material'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { ProjectImageModals } from './ProjectImageModals'
import { ProjectImage } from './ProjectImage'
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
import { IProject } from '@modules/project/model/projects/IProject'
import { useProjectImageStore } from '@modules/project/model/projectImages/store'

function ProjectImages() {
  const router = useRouter()
  const {
    data: project,
    mutate,
    isLoading,
    isValidating,
  } = useSWR<{ data: IProject }>(`/projects/${router.query.slug}`, getFetcher)
  const {trigger, isMutating} = useSWRMutation('/project-images', deleteFetcher)
  const [handleCreateOpen] = useProjectImageStore(({handleCreateOpen}) => [handleCreateOpen])

  if (isLoading || isValidating || isMutating) {
    return <Loader/>
  }

  if (!project) {
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
            href="/main/projects"
            component={Link}
          >
            <Icon icon="ep:back"/>
          </IconButton>
          Галерея "{project.data.title || ''}"
        </>}
        buttonName="Добавить изображение"
      />
      <Box p={8}>
        <ImageList sx={{width: '100%', height: 'auto'}}>
          {project.data.images.map(image => (
            <ProjectImage
              image={image}
              trigger={trigger}
              mutate={mutate}
            />
          ))}
        </ImageList>
      </Box>
      <ProjectImageModals
        mutate={mutate}
        projectId={project.data.id}
      />
    </CustomCard>
  )
}

export { ProjectImages }
