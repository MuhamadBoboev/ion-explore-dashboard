import useSWR from 'swr'
import Error500 from '../../../pages/500'
import CustomCard from '@shared/ui/CustomCard'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { useProviderStore } from '@modules/provider/model/store'
import { IProvider } from '@modules/provider'
import { ProvidersTable } from '@modules/provider/ui/ProvidersTable'
import { ProviderModals } from '@modules/provider/ui/ProviderModals'

function Providers() {
  const [handleCreateOpen] = useProviderStore(({handleCreateOpen}) => [handleCreateOpen])
  const {
    data: providers,
    isValidating,
    isLoading,
    error,
    mutate,
  } = useSWR<{ data: IProvider[] }>('/providers', getFetcher)

  if (error) {
    return <Error500/>
  }

  return (
    <CustomCard>
      <ProviderModals
        mutate={mutate}
      />
      <CustomPageHeader
        handleOpen={handleCreateOpen}
        title="Поставщики"
        buttonName="Создать"
      />
      <ProvidersTable
        mutate={mutate}
        loading={isLoading || isValidating}
        providers={providers?.data || []}
      />
    </CustomCard>
  )
}

export { Providers }
