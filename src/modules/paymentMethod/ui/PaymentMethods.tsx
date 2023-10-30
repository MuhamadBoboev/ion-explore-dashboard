import useSWR from 'swr'
import Error500 from '../../../pages/500'
import CustomCard from '@shared/ui/CustomCard'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { usePaymentMethodStore } from '@modules/paymentMethod/model/store'
import { IPaymentMethod } from '@modules/paymentMethod/model/IPaymentMethod'
import { PaymentMethodsTable } from '@modules/paymentMethod/ui/PaymentMethodsTable'
import { PaymentMethodModals } from '@modules/paymentMethod/ui/PaymentMethodModals'

function PaymentMethods() {
  const [handleCreateOpen] = usePaymentMethodStore(({handleCreateOpen}) => [handleCreateOpen])
  const {
    data: paymentMethods,
    isValidating,
    isLoading,
    error,
    mutate,
  } = useSWR<{ data: IPaymentMethod[] }>('/payment-methods', getFetcher)

  if (error) {
    return <Error500/>
  }

  return (
    <CustomCard>
      <PaymentMethodModals mutate={mutate}/>
      <CustomPageHeader
        handleOpen={handleCreateOpen}
        title="Методы оплаты"
        buttonName="Создать"
      />
      <PaymentMethodsTable
        loading={isLoading || isValidating}
        paymentMethods={paymentMethods?.data || []}
      />
    </CustomCard>
  )
}

export { PaymentMethods }
