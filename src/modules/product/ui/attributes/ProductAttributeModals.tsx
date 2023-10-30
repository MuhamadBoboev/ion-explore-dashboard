import useSWR, { KeyedMutator } from 'swr'
import { useProductAttributeStore } from '@modules/product/model/attributes/store'
import { CreateProductAttribute } from '@modules/product/ui/attributes/CreateProductAttribute'
import { IAttribute } from '@modules/attribute'
import { UpdateProductAttribute } from '@modules/product/ui/attributes/UpdateProductAttribute'
import { getFetcher } from '@shared/api/fetcher/getFetcher'

interface Props {
  mutate: KeyedMutator<any>
  productId: number
}

function ProductAttributeModals({productId, mutate}: Props) {
  const [open, update] = useProductAttributeStore(({open, update}) => [open, update])
  const {
    data: attributes
  } = useSWR<{data: IAttribute[]}>('/attributes', getFetcher)

  if (!attributes) {
    return null
  }

  return (
    <>
      {open && <CreateProductAttribute
        attributes={attributes.data}
        productId={productId}
        mutate={mutate}
      />}
      {update && <UpdateProductAttribute
        attributes={attributes.data}
        mutate={mutate}
      />}
    </>
  )
}

export { ProductAttributeModals }
