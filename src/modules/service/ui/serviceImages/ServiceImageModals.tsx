import { KeyedMutator } from 'swr'
import { useServiceImageStore } from '@modules/service/model/serviceImages/store'
import { CreateServiceImage } from '@modules/service/ui/serviceImages/CreateServiceImage'
import { UpdateServiceImage } from '@modules/service/ui/serviceImages/UpdateServiceImage'

interface Props {
  mutate: KeyedMutator<any>
  serviceId: number
}

function ServiceImageModals({mutate, serviceId}: Props) {
  const [open, update] = useServiceImageStore(({open, update}) => [open, update])
  return (
    <>
      {open && <CreateServiceImage
        serviceId={serviceId}
        mutate={mutate}
      />}
      {update && <UpdateServiceImage mutate={mutate}/>}
    </>
  )
}

export { ServiceImageModals }
