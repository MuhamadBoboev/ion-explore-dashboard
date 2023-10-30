import { KeyedMutator } from 'swr'
import { usePaymentMethodStore } from '@modules/paymentMethod/model/store'
import { CreatePaymentMethod } from '@modules/paymentMethod/ui/CreatePaymentMethod'
import { UpdatePaymentMethod } from '@modules/paymentMethod/ui/UpdatePaymentMethod'

interface Props {
  mutate: KeyedMutator<any>
}

function PaymentMethodModals({mutate}: Props) {
  const [open, update] = usePaymentMethodStore(({open, update}) => [open, update])

  return (
    <>
      {open && <CreatePaymentMethod/>}
      {update && <UpdatePaymentMethod mutate={mutate}/>}
    </>
  )
}

export { PaymentMethodModals }
