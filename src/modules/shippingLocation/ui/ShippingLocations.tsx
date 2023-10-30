import useSWR from 'swr'
import Error500 from '../../../pages/500'
import CustomCard from '@shared/ui/CustomCard'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { useShippingLocationStore } from '@modules/shippingLocation/model/store'
import { ShippingLocationModals } from '@modules/shippingLocation/ui/ShippingLocationModals'
import { ShippingLocationsTable } from '@modules/shippingLocation/ui/ShippingLocationsTable'
import { IShippingLocation } from '@modules/shippingLocation/model/IShippingLocation'

function ShippingLocations() {
  const [handleCreateOpen] = useShippingLocationStore(({handleCreateOpen}) => [handleCreateOpen])
  const {
    data: shippingLocations,
    isValidating,
    isLoading,
    error,
    mutate,
  } = useSWR<{ data: IShippingLocation[] }>('/shipping-locations', getFetcher)

  if (error) {
    return <Error500/>
  }

  return (
    <CustomCard>
      <ShippingLocationModals mutate={mutate}/>
      <CustomPageHeader
        handleOpen={handleCreateOpen}
        title="Локации доставки"
        buttonName="Создать"
      />
      <ShippingLocationsTable
        loading={isLoading || isValidating}
        shippingLocations={shippingLocations?.data || []}
      />
    </CustomCard>
  )
}

export { ShippingLocations }
