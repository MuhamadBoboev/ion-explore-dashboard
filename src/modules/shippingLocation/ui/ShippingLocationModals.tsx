import { KeyedMutator } from 'swr'
import { useShippingLocationStore } from '@modules/shippingLocation/model/store'
import { CreateShippingLocation } from '@modules/shippingLocation/ui/CreateShippingLocation'
import { UpdateShippingLocation } from '@modules/shippingLocation/ui/UpdateShippingLocation'

interface Props {
  mutate: KeyedMutator<any>
}

function ShippingLocationModals({mutate}: Props) {
  const [open, update] = useShippingLocationStore(({open, update}) => [open, update])

  return (
    <>
      {open && <CreateShippingLocation/>}
      {update && <UpdateShippingLocation mutate={mutate}/>}
    </>
  )
}

export { ShippingLocationModals }
