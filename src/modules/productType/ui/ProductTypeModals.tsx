import { KeyedMutator } from 'swr'
import { useProductTypeStore } from '@modules/productType/model/store'
import { CreateProductType } from '@modules/productType/ui/CreateProductType'
import { UpdateProductType } from '@modules/productType/ui/UpdateProductType'

interface Props {
  mutate: KeyedMutator<any>
}

function ProductTypeModals({mutate}: Props) {
  const [open, update] = useProductTypeStore(({open, update}) => [open, update])

  return (
    <>
      {open && <CreateProductType/>}
      {update && <UpdateProductType mutate={mutate}/>}
    </>
  )
}

export { ProductTypeModals }
