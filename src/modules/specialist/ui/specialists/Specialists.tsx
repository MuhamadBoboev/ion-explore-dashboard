import useSWR from 'swr'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import Error500 from '../../../../pages/500'
import CustomCard from '@shared/ui/CustomCard'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { useSpecialistStore } from '@modules/specialist/model/specialists/store'
import { ISpecialist, ISpecialistData } from '@modules/specialist/model/specialists/ISpecialist'
import { SpecialistModals } from '@modules/specialist/ui/specialists/SpecialistModals'
import { SpecialistsTable } from '@modules/specialist/ui/specialists/SpecialistsTable'
import { useLanguageStore } from '@shared/model/store'

function Specialists() {
  const { lang } = useLanguageStore(({ lang }) => ({ lang }))
  const [handleCreateOpen] = useSpecialistStore(({ handleCreateOpen }) => [handleCreateOpen])
  const {
    data: specialists,
    isValidating,
    isLoading,
    error,
    mutate,
  } = useSWR<ISpecialist[]>(`/guide/?lang=${lang}`, getFetcher)

  if (error) {
    return <Error500 />
  }

  return (
    <CustomCard>
      <SpecialistModals mutate={mutate} />
      <CustomPageHeader
        handleOpen={handleCreateOpen}
        title="Гиды"
        buttonName="Добавить"
      />
      <SpecialistsTable
        loading={isLoading || isValidating}
        specialists={specialists}
        mutate={mutate}
      />
    </CustomCard>
  )
}

export { Specialists }
