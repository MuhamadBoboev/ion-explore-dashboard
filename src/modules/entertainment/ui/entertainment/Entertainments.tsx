import useSWR from 'swr'
import Error500 from '../../../../pages/500'
import CustomCard from '@shared/ui/CustomCard'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
// import { useEntertainmentStore } from '@modules/Entertainment/model/store'
// import { ITour } from '@modules/Entertainment'
// import { EntertainmentsTable } from '@modules/Entertainment/ui/tour/EntertainmentsTable'
// import { EntertainmentModals } from '@modules/Entertainment/ui/tour/EntertainmentModals'
import { Subcategories } from '@modules/catalog/ui/subcategory/Subcategories';
import { ISubcategory } from '@modules/catalog'
import { useLanguageStore } from '@shared/model/store'
import { IEntertainment } from '@modules/entertainment/model/IEntertainment'
import { useEntertainmentStore } from '@modules/entertainment/model/store'
import { EntertainmentModals } from './EntertaimentModals'
import { EntertainmentsTable } from './EntertainmentTable'

function Entertainments() {
  const [handleCreateOpen] = useEntertainmentStore(({ handleCreateOpen }) => [handleCreateOpen])
  const lang = useLanguageStore(({ langList, lang }) => langList.find((el) => el.code === lang))

  const {
    data: Entertainments,
    isValidating,
    isLoading,
    error,
    mutate,
  } = useSWR<IEntertainment[]>(`/entertainment/?lang=${lang?.code}`, getFetcher)


  if (error) {
    return <Error500 />
  }
  return (
    <CustomCard>
      <EntertainmentModals
        mutate={mutate}
      />
      <CustomPageHeader
        handleOpen={handleCreateOpen}
        title="Поставщики"
        buttonName="Создать"
      />
      <EntertainmentsTable
        mutate={mutate}
        loading={isLoading || isValidating}
        Entertainments={Entertainments || []}
      />
    </CustomCard>
  )
}

export { Entertainments }
