import { KeyedMutator } from 'swr'
import { useProjectImageStore } from '@modules/project/model/projectImages/store'
import { CreateProjectImage } from '@modules/project/ui/projectImages/CreateProjectImage'
import { UpdateProjectImage } from '@modules/project/ui/projectImages/UpdateProjectImage'

interface Props {
  mutate: KeyedMutator<any>
  projectId: number
}

function ProjectImageModals({mutate, projectId}: Props) {
  const [open, update] = useProjectImageStore(({open, update}) => [open, update])
  return (
    <>
      {open && <CreateProjectImage
        projectId={projectId}
        mutate={mutate}
      />}
      {update && <UpdateProjectImage mutate={mutate}/>}
    </>
  )
}

export { ProjectImageModals }
