import { KeyedMutator } from 'swr'
import { useServiceStore } from '@modules/service/model/services/store'
import { CreateService } from '@modules/service/ui/services/CreateService'
import { UpdateService } from '@modules/service/ui/services/UpdateService'

interface Props {
  mutate: KeyedMutator<any>
}

function ServiceModals({mutate}: Props) {
  const [open, update] = useServiceStore(({open, update}) => [open, update])

  return (
    <>
      {open && <CreateService mutate={mutate}/>}
      {update && <UpdateService mutate={mutate}/>}
    </>
  )
}

export { ServiceModals }
