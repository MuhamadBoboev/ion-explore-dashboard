import { LinearProgress } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { Dispatch, SetStateAction } from 'react'
import { IOrder, IOrderData } from '@modules/order/model/IOrder'
import { orderColumns } from '@modules/order/model/orderColumns'
import { KeyedMutator } from 'swr'
import { PaginationModelType } from '@shared/lib/PaginationModelType'

interface Props {
  loading: boolean
  orders?: IOrderData
  paginationModel: PaginationModelType
  setPaginationModel: Dispatch<SetStateAction<PaginationModelType>>
  mutate: KeyedMutator<any>
  handleChangeOpen: Dispatch<SetStateAction<IOrder | null>>
}

function OrdersTable({
                       orders,
                       setPaginationModel,
                       paginationModel,
                       loading,
                       mutate,
                       handleChangeOpen,
                     }: Props) {
  return (
    <DataGrid
      slots={{loadingOverlay: LinearProgress}}
      loading={loading}
      columns={orderColumns({handleChangeOpen})}
      rows={orders?.data || []}
      rowSelection={false}
      pagination={true}
      paginationModel={paginationModel}
      pageSizeOptions={[5, 10, 15, 20, 25, 30, 35]}
      paginationMode="server"
      onPaginationModelChange={async (model) => {
        setPaginationModel(model)
        await mutate(orders, {
          revalidate: true,
        })
      }}
      rowCount={orders?.meta?.total}
      autoHeight
      localeText={{
        noRowsLabel: 'Пусто'
      }}
    />
  )
}

export { OrdersTable }
