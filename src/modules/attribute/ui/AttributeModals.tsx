import { KeyedMutator } from 'swr'
import { useAttributeStore } from '@modules/attribute/model/store'
import { CreateAttribute } from '@modules/attribute/ui/CreateAttribute'
import { UpdateAttribute } from '@modules/attribute/ui/UpdateAttribute'

interface Props {
  mutate: KeyedMutator<any>
}

function AttributeModals({mutate}: Props) {
  const [open, update] = useAttributeStore(({open, update}) => [open, update])

  return (
    <>
      {open && <CreateAttribute mutate={mutate}/>}
      {update && <UpdateAttribute mutate={mutate}/>}
    </>
  )
}

export { AttributeModals }
