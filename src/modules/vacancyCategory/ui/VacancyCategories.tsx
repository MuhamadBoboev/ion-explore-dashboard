import useSWR from 'swr'
import Error500 from '../../../pages/500'
import CustomCard from '@shared/ui/CustomCard'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { useVacancyCategoryStore } from '@modules/vacancyCategory/model/store'
import { IVacancyCategory } from '@modules/vacancyCategory/model/IVacancyCategory'
import { VacancyCategoryModals } from '@modules/vacancyCategory/ui/VacancyCategoryModals'
import { VacancyCategoriesTable } from '@modules/vacancyCategory/ui/VacancyCategoriesTable'

function VacancyCategories() {
  const [handleCreateOpen] = useVacancyCategoryStore(({handleCreateOpen}) => [handleCreateOpen])
  const {
    data: vacancyCategories,
    isValidating,
    isLoading,
    error,
    mutate,
  } = useSWR<{ data: IVacancyCategory[] }>('/vacancy-categories', getFetcher)

  if (error) {
    return <Error500/>
  }

  return (
    <CustomCard>
      <VacancyCategoryModals mutate={mutate}/>
      <CustomPageHeader
        handleOpen={handleCreateOpen}
        title="Категории вакансий"
        buttonName="Создать"
      />
      <VacancyCategoriesTable
        mutate={mutate}
        loading={isLoading || isValidating}
        vacancyCategories={vacancyCategories?.data || []}
      />
    </CustomCard>
  )
}

export { VacancyCategories }
