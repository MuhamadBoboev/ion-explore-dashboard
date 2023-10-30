import { KeyedMutator } from 'swr'
import { useProductImageStore } from '@modules/product/model/images/store'
import { CreateProductImage } from '@modules/product/ui/images/CreateProductImage'
import { UpdateProductImage } from '@modules/product/ui/images/UpdateProductImage'

interface Props {
  mutate: KeyedMutator<any>
  productId: number
}

function ProductImageModals({mutate, productId}: Props) {
  const [open, update] = useProductImageStore(({open, update}) => [open, update])
  return (
    <>
      {open && <CreateProductImage
        productId={productId}
        mutate={mutate}
      />}
      {update && <UpdateProductImage mutate={mutate}/>}
    </>
  )
}

export { ProductImageModals }
