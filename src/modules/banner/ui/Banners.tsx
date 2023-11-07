import { useBannerStore } from '@modules/banner/model/store'
import useSWR from 'swr'
import { IBanner } from '@modules/banner'
import Error500 from '../../../pages/500'
import CustomCard from '@shared/ui/CustomCard'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { BannersTable } from '@modules/banner/ui/BannersTable'
import { BannerModals } from '@modules/banner/ui/BannerModals'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { langSelector, useLanguageStore } from '@shared/model/store'
import { ContactTable } from './ContactTable'

function Banners() {
  const lang = useLanguageStore(langSelector)
  const [handleCreateOpen] = useBannerStore(({ handleCreateOpen }) => [handleCreateOpen])
  const {
    data,
    isValidating,
    isLoading,
    error,
    mutate,
  } = useSWR<IBanner>(`/contact/?lang=${lang}`, getFetcher, {
    revalidateOnFocus: true,
  })

  if (error) {
    return <Error500 />
  }

  return (
    <CustomCard>
      <BannerModals mutate={mutate} />
      <CustomPageHeader
        handleOpen={handleCreateOpen}
        title="Контакты"
        buttonName="Создать"
      />
      <ContactTable
        loading={isLoading}
        contact={data || error}
        mutate={mutate}
      />
      {/* <BannersTable
        loading={isLoading || isValidating}
        banners={banners?.data || []}
        mutate={mutate}
      /> */}
    </CustomCard>
  )
}

export { Banners }
