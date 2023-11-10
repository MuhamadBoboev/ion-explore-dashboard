import useSWR from 'swr'
import Error500 from '../../../pages/500'
import CustomCard from '@shared/ui/CustomCard'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { useProviderStore } from '@modules/provider/model/store'
import { IProvider } from '@modules/provider'
import { ProvidersTable } from '@modules/provider/ui/ProvidersTable'
import { ProviderModals } from '@modules/provider/ui/ProviderModals'
import { Subcategories } from '@modules/catalog/ui/subcategory/Subcategories';
import { ISubcategory } from '@modules/catalog'
import { useLanguageStore } from '@shared/model/store'

function Providers() {
  const [handleCreateOpen] = useProviderStore(({ handleCreateOpen }) => [handleCreateOpen])
  const lang = useLanguageStore(({ langList, lang }) => langList.find((el) => el.code === lang))

  const {
    data: providers,
    isValidating,
    isLoading,
    error,
    mutate,
  } = useSWR<IProvider[]>(`/tour/?lang=${lang?.code}`, getFetcher)


  if (error) {
    return <Error500 />
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
        providers={providers || []}
      />
    </CustomCard>
  )
}

export { Providers }
