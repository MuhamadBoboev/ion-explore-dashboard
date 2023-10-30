import useSWRMutation from 'swr/mutation'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import { DataGrid } from '@mui/x-data-grid'
import { LinearProgress } from '@mui/material'
import { IPaymentMethod } from '@modules/paymentMethod/model/IPaymentMethod'
import { usePaymentMethodStore } from '@modules/paymentMethod/model/store'
import { paymentMethodColumns } from '@modules/paymentMethod/model/paymentMethodColumns'

interface Props {
  loading: boolean
  paymentMethods: IPaymentMethod[]
}

function PaymentMethodsTable({paymentMethods, loading}: Props) {
  const {trigger} = useSWRMutation('/payment-methods', deleteFetcher)
  const [handleUpdateOpen] = usePaymentMethodStore(({handleUpdateOpen}) => [handleUpdateOpen])

  return (
    <DataGrid
      slots={{loadingOverlay: LinearProgress}}
      hideFooter
      loading={loading}
      columns={paymentMethodColumns({handleUpdateOpen, trigger})}
      rows={paymentMethods}
      rowSelection={false}
      autoHeight
      localeText={{
        noRowsLabel: 'Пусто'
      }}
    />
  )
}

export { PaymentMethodsTable }
