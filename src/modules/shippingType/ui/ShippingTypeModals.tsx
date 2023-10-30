import { KeyedMutator } from 'swr'
import { useShippingTypeStore } from '@modules/shippingType/model/store'
import { CreateShippingType } from '@modules/shippingType/ui/CreateShippingType'
import { UpdateShippingType } from '@modules/shippingType/ui/UpdateShippingType'

interface Props {
  mutate: KeyedMutator<any>
}

function ShippingTypeModals({mutate}: Props) {
  const [open, update] = useShippingTypeStore(({open, update}) => [open, update])

  return (
    <>
      {open && <CreateShippingType/>}
      {update && <UpdateShippingType mutate={mutate}/>}
    </>
  )
}

export { ShippingTypeModals }
