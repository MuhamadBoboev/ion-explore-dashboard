import { KeyedMutator } from 'swr'
import { useProjectStore } from '@modules/project/model/projects/store'
import { CreateProject } from '@modules/project/ui/projects/CreateProject'
import { UpdateProject } from '@modules/project/ui/projects/UpdateProject'

interface Props {
  mutate: KeyedMutator<any>
}

function ProjectModals({mutate}: Props) {
  const [open, update] = useProjectStore(({open, update}) => [open, update])

  return (
    <>
      {open && <CreateProject mutate={mutate}/>}
      {update && <UpdateProject mutate={mutate}/>}
    </>
  )
}

export { ProjectModals }
