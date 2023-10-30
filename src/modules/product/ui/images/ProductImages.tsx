import { ImageList } from '@mui/material'
import Button from '@mui/material/Button'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { ProductImageModals } from './ProductImageModals'
import { ProductImage } from './ProductImage'
import { IProductImage } from '@modules/product/model/images/IProductImage'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import { useProductImageStore } from '@modules/product/model/images/store'
import Loader from '@shared/ui/Loader'

interface Props {
  productId: number
}

function ProductImages({productId}: Props) {
  const {
    data: productImages,
    isLoading,
    mutate
  } = useSWR<{ data: IProductImage[] }>(
    `/products/${productId}/images`,
    getFetcher
  )
  const {trigger, isMutating} = useSWRMutation('/product-image', deleteFetcher)
  const [handleCreateOpen] = useProductImageStore(({handleCreateOpen}) => [handleCreateOpen])

  if (isLoading || isMutating) {
    return <Loader/>
  }

  if (!productImages) {
    return null
  }

  return (
    <div>
      <Button
        size="large"
        variant="contained"
        sx={{margin: '10px 0 20px'}}
        onClick={handleCreateOpen}
      >
        Добавить изображение
      </Button>
      <ImageList sx={{width: '100%', height: 'auto'}}>
        {productImages.data.map(image => (
          <ProductImage
            image={image}
            trigger={trigger}
            mutate={mutate}
          />
        ))}
      </ImageList>
      <ProductImageModals
        mutate={mutate}
        productId={productId}
      />
    </div>
  )
}

export { ProductImages }
