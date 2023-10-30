import useSWR from 'swr'
import Error500 from '../../../pages/500'
import CustomCard from '@shared/ui/CustomCard'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { useShippingTypeStore } from '@modules/shippingType/model/store'
import { IShippingType } from '@modules/shippingType/model/IShippingType'
import { ShippingTypeModals } from '@modules/shippingType/ui/ShippingTypeModals'
import { ShippingTypesTable } from '@modules/shippingType/ui/ShippingTypesTable'

function ShippingTypes() {
  const [handleCreateOpen] = useShippingTypeStore(({handleCreateOpen}) => [handleCreateOpen])
  const {
    data: shippingTypes,
    isValidating,
    isLoading,
    error,
    mutate,
  } = useSWR<{ data: IShippingType[] }>('/shipping-types', getFetcher)

  if (error) {
    return <Error500/>
  }

  return (
    <CustomCard>
      <ShippingTypeModals mutate={mutate}/>
      <CustomPageHeader
        handleOpen={handleCreateOpen}
        title="Типы доставки"
        buttonName="Создать"
      />
      <ShippingTypesTable
        loading={isLoading || isValidating}
        shippingTypes={shippingTypes?.data || []}
      />
    </CustomCard>
  )
}

export { ShippingTypes }
