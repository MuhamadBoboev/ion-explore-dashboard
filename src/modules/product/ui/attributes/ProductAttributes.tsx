import useSWR from 'swr'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { useProductAttributeStore } from '@modules/product/model/attributes/store'
import { IProductAttribute } from '@modules/product/model/attributes/IProductAttribute'
import Error500 from '../../../../pages/500'
import { ProductAttributeModals } from '@modules/product/ui/attributes/ProductAttributeModals'
import { ProductAttributesTable } from '@modules/product/ui/attributes/ProductAttributesTable'
import Button from '@mui/material/Button'

interface Props {
  productId: number
}

function ProductAttributes({productId}: Props) {
  const [handleCreateOpen] = useProductAttributeStore(({handleCreateOpen}) => [handleCreateOpen])
  const {
    data: productAttributes,
    isValidating,
    isLoading,
    error,
    mutate,
  } = useSWR<{ data: IProductAttribute[] }>(`/products/${productId}/attributes`, getFetcher)

  if (error) {
    return <Error500/>
  }

  return (
    <>
      <ProductAttributeModals productId={productId} mutate={mutate}/>
      <Button
        variant="contained"
        sx={{mr: 5, mb: 10}}
        onClick={handleCreateOpen}
      >
        Добавить
      </Button>
      <ProductAttributesTable
        loading={isLoading || isValidating}
        productAttributes={productAttributes?.data || []}
        mutate={mutate}
      />
    </>
  )
}

export { ProductAttributes }
