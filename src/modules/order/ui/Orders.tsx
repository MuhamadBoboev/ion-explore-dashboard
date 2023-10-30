import useSWR from 'swr'
import { IOrder, IOrderData } from '@modules/order/model/IOrder'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import CustomCard from '@shared/ui/CustomCard'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { OrdersTable } from '@modules/order/ui/OrdersTable'
import { useState } from 'react'
import { OrderShow } from '@modules/order/ui/OrderShow'
import { IOrderStatusCategory } from '@modules/order/model/IOrderStatus'
import Loader from '@shared/ui/Loader'

function Orders() {
  const [activeOrder, setActiveOrder] = useState<IOrder | null>(null)
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })
  const {
    data: orders,
    isValidating,
    isLoading,
    error,
    mutate,
  } = useSWR<IOrderData>(`/orders/admin?page=${paginationModel.page + 1}&per_page=${paginationModel.pageSize}`, getFetcher, {
    keepPreviousData: true,
  })
  const { data: statusCategories } = useSWR<IOrderStatusCategory[]>('/orders/statuses', getFetcher)

  if (error) {
    throw new Error()
  }

  if (!statusCategories) {
    return <Loader />
  }

  return (
    <CustomCard>
      {activeOrder && <OrderShow
        order={activeOrder}
        handleClose={() => setActiveOrder(null)}
        statusCategories={statusCategories}
        mutate={mutate}
      />}
      <Box
        component="header"
        p={5}
      >
        <Typography component="h1" variant="h5">Все заказы</Typography>
      </Box>
      <OrdersTable
        loading={isLoading || isValidating}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        mutate={mutate}
        orders={orders}
        handleChangeOpen={setActiveOrder}
      />
    </CustomCard>
  )
}

export { Orders }
