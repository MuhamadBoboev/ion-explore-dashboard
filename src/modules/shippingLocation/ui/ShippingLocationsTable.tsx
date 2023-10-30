import useSWRMutation from 'swr/mutation'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import { DataGrid } from '@mui/x-data-grid'
import { LinearProgress } from '@mui/material'
import { IShippingLocation } from '@modules/shippingLocation/model/IShippingLocation'
import { useShippingLocationStore } from '@modules/shippingLocation/model/store'
import { shippingLocationColumns } from '@modules/shippingLocation/model/shippingLocationColumns'

interface Props {
  loading: boolean
  shippingLocations: IShippingLocation[]
}

function ShippingLocationsTable({shippingLocations, loading}: Props) {
  const {trigger} = useSWRMutation('/shipping-locations', deleteFetcher)
  const [handleUpdateOpen] = useShippingLocationStore(({handleUpdateOpen}) => [handleUpdateOpen])

  return (
    <DataGrid
      slots={{loadingOverlay: LinearProgress}}
      hideFooter
      loading={loading}
      columns={shippingLocationColumns({handleUpdateOpen, trigger})}
      rows={shippingLocations}
      rowSelection={false}
      autoHeight
      localeText={{
        noRowsLabel: 'Пусто'
      }}
    />
  )
}

export { ShippingLocationsTable }
