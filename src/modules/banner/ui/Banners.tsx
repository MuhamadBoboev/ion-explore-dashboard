import { useBannerStore } from '@modules/banner/model/store'
import useSWR from 'swr'
import { IBanner } from '@modules/banner'
import Error500 from '../../../pages/500'
import CustomCard from '@shared/ui/CustomCard'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { BannersTable } from '@modules/banner/ui/BannersTable'
import { BannerModals } from '@modules/banner/ui/BannerModals'
import { getFetcher } from '@shared/api/fetcher/getFetcher'

function Banners() {
  const [handleCreateOpen] = useBannerStore(({handleCreateOpen}) => [handleCreateOpen])
  const {
    data: banners,
    isValidating,
    isLoading,
    error,
    mutate,
  } = useSWR<{ data: IBanner[] }>('/banners', getFetcher)

  if (error) {
    return <Error500/>
  }

  return (
    <CustomCard>
      <BannerModals mutate={mutate}/>
      <CustomPageHeader
        handleOpen={handleCreateOpen}
        title="Баннеры"
        buttonName="Создать"
      />
      <BannersTable
        loading={isLoading || isValidating}
        banners={banners?.data || []}
        mutate={mutate}
      />
    </CustomCard>
  )
}

export { Banners }
