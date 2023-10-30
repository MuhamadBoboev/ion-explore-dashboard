import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { IOrder } from '@modules/order/model/IOrder'
import Typography from '@mui/material/Typography'
import { OrderShowStyled } from '@modules/order/ui/OrderShowStyled'
import { OrderProducts } from '@modules/order/ui/OrderProducts'
import Box from '@mui/material/Box'
import { Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { IOrderStatusCategory } from '@modules/order/model/IOrderStatus'
import { useState } from 'react'
import { LoadingButton } from '@mui/lab'
import useSWRMutation from 'swr/mutation'
import { updateFetcher } from '@shared/api/fetcher/updateFetcher'
import toast from 'react-hot-toast'
import { KeyedMutator } from 'swr'

interface Props {
  order: IOrder
  statusCategories: IOrderStatusCategory[]
  mutate: KeyedMutator<any>
  handleClose(): void
}

function OrderShow({order, statusCategories, handleClose, mutate}: Props) {
  const [activeStatus, setActiveStatus] = useState(order.status.id)
  const {trigger, isMutating, error} = useSWRMutation(['/orders/admin', order?.id], updateFetcher)
  const {
    id,
    user,
    status,
    shipping_address,
    payment_method,
    comment,
    shipping_location,
    shipping_type,
    items,
    sub_total,
    discount,
    total,
    created_at,
  } = order

  const statusCategory = statusCategories.find(({id}) => id === status.category_id)

  if (error) {
    toast.error(error.message)
  }

  return (
    <CustomDialog
      title=""
      handleClose={handleClose}
      maxWidth="xl"
    >
      <Box
        display="flex"
        alignItems="stretch"
        justifyContent="space-between"
      >
        <OrderShowStyled>
          <Typography
            sx={{mb: 4}}
            variant="h5"
          >ID заказа - {id}</Typography>
          <dl className="list">
            <div className="item">
              <dt className="name">Клиент</dt>
              <dd className="value">{user.name}</dd>
            </div>
            {payment_method?.name && <div className="item">
              <dt className="name">Метод оплаты</dt>
              <dd className="value">{payment_method.name}</dd>
            </div>}
            {shipping_location && <div className="item">
              <dt className="name">Локация</dt>
              <dd className="value">{shipping_location.name}</dd>
            </div>}
            {shipping_type && <div className="item">
              <dt className="name">Тип доставки</dt>
              <dd className="value">{shipping_type.name}</dd>
            </div>}
            {!!discount && <div className="item">
              <dt className="name">Скидка</dt>
              <dd className="value">{discount}%</dd>
            </div>}
            {status && <div className="item">
              <dt className="name">Статус заказа ({statusCategory?.name})</dt>
              <Box
                display="flex"
                sx={{width: '100%'}}
              >
                <Select
                  id="select-status"
                  required
                  value={activeStatus}
                  sx={{flexGrow: 1, mr: 4}}
                  fullWidth
                  onChange={(event) => {
                    setActiveStatus(event.target.value)
                  }}
                >
                  {statusCategory?.statuses?.map(({id, name}) => (
                    <MenuItem value={id}>{name}</MenuItem>
                  ))}
                </Select>
                <LoadingButton
                  variant="contained"
                  disabled={status.id === activeStatus}
                  size="large"
                  loading={isMutating}
                  onClick={async () => {
                    const response = await trigger({status: activeStatus})
                    if (response.message) {
                      toast(response.message)
                    } else if (response?.data?.id) {
                      toast.success('Статус успешно изменен')
                    }
                    await mutate()
                    handleClose()
                  }}
                >
                  Изменить
                </LoadingButton>
              </Box>
            </div>}
            <div className="item">
              <dt className="name">Общая сумма</dt>
              <dd className="value">{total} c.</dd>
            </div>
            {total !== sub_total && <div className="item">
              <dt className="name">Общая сумма со скидкой</dt>
              <dd className="value">{sub_total} с.</dd>
            </div>}
            {comment && <div className="item">
              <dt className="name">Комментария</dt>
              <dd className="value">{comment}</dd>
            </div>}
            <div className="item">
              <dt className="name">Дата создание заявки</dt>
              <dd className="value">{new Date(created_at).toLocaleString('ru')}</dd>
            </div>
          </dl>
        </OrderShowStyled>
        <Box sx={{width: '45%', flexBasis: '45%'}}>
          <OrderProducts items={items}/>
        </Box>
      </Box>
    </CustomDialog>
  )
}

export { OrderShow }
