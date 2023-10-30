import useSWR from 'swr'
import Error500 from '../../../pages/500'
import CustomCard from '@shared/ui/CustomCard'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { useProductTypeStore } from '@modules/productType/model/store'
import { IProductType } from '@modules/productType'
import { ProductTypesTable } from '@modules/productType/ui/ProductTypesTable'
import { ProductTypeModals } from '@modules/productType/ui/ProductTypeModals'

function ProductTypes() {
  const [handleCreateOpen] = useProductTypeStore(({handleCreateOpen}) => [handleCreateOpen])
  const {
    data: productTypes,
    isValidating,
    isLoading,
    error,
    mutate,
  } = useSWR<{ data: IProductType[] }>('/product-types', getFetcher)

  if (error) {
    return <Error500/>
  }

  return (
    <CustomCard>
      <ProductTypeModals mutate={mutate}/>
      <CustomPageHeader
        handleOpen={handleCreateOpen}
        title="Типы товаров"
        buttonName="Создать"
      />
      <ProductTypesTable
        loading={isLoading || isValidating}
        productTypes={productTypes?.data || []}
      />
    </CustomCard>
  )
}

export { ProductTypes }
