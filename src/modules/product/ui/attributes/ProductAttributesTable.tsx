import useSWRMutation from 'swr/mutation'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import { DataGrid } from '@mui/x-data-grid'
import { LinearProgress } from '@mui/material'
import { IProductAttribute } from '@modules/product/model/attributes/IProductAttribute'
import { useProductAttributeStore } from '@modules/product/model/attributes/store'
import { productAttributeColumns } from '@modules/product/model/attributes/productAttributeColumns'
import { KeyedMutator } from 'swr'

interface Props {
  loading: boolean
  productAttributes: IProductAttribute[]
  mutate: KeyedMutator<any>
}

function ProductAttributesTable({productAttributes, loading, mutate}: Props) {
  const {trigger} = useSWRMutation('/product-attribute', deleteFetcher)
  const [handleUpdateOpen] = useProductAttributeStore(({handleUpdateOpen}) => [handleUpdateOpen])

  return (
    <DataGrid
      slots={{loadingOverlay: LinearProgress}}
      hideFooter
      loading={loading}
      columns={productAttributeColumns({mutate, handleUpdateOpen, trigger})}
      rows={productAttributes}
      rowSelection={false}
      autoHeight
      localeText={{
        noRowsLabel: 'Пусто'
      }}
    />
  )
}

export { ProductAttributesTable }
