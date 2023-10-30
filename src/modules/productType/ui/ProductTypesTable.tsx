import useSWRMutation from 'swr/mutation'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import { DataGrid } from '@mui/x-data-grid'
import { LinearProgress } from '@mui/material'
import { IProductType } from '@modules/productType'
import { useProductTypeStore } from '@modules/productType/model/store'
import { productTypeColumns } from '@modules/productType/model/productTypeColumns'

interface Props {
  loading: boolean
  productTypes: IProductType[]
}

function ProductTypesTable({productTypes, loading}: Props) {
  const {trigger} = useSWRMutation('/product-types', deleteFetcher)
  const [handleUpdateOpen] = useProductTypeStore(({handleUpdateOpen}) => [handleUpdateOpen])

  return (
    <DataGrid
      slots={{loadingOverlay: LinearProgress}}
      hideFooter
      loading={loading}
      columns={productTypeColumns({handleUpdateOpen, trigger})}
      rows={productTypes}
      rowSelection={false}
      autoHeight
      localeText={{
        noRowsLabel: 'Пусто'
      }}
    />
  )
}

export { ProductTypesTable }
