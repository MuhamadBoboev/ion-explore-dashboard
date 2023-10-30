import useSWRMutation from 'swr/mutation'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import { DataGrid } from '@mui/x-data-grid'
import { LinearProgress } from '@mui/material'
import { IShippingType } from '@modules/shippingType/model/IShippingType'
import { useShippingTypeStore } from '@modules/shippingType/model/store'
import { shippingTypeColumns } from '@modules/shippingType/model/shippingTypeColumns'

interface Props {
  loading: boolean
  shippingTypes: IShippingType[]
}

function ShippingTypesTable({shippingTypes, loading}: Props) {
  const {trigger} = useSWRMutation('/shipping-types', deleteFetcher)
  const [handleUpdateOpen] = useShippingTypeStore(({handleUpdateOpen}) => [handleUpdateOpen])

  return (
    <DataGrid
      slots={{loadingOverlay: LinearProgress}}
      hideFooter
      loading={loading}
      columns={shippingTypeColumns({handleUpdateOpen, trigger})}
      rows={shippingTypes}
      rowSelection={false}
      autoHeight
      localeText={{
        noRowsLabel: 'Пусто'
      }}
    />
  )
}

export { ShippingTypesTable }
