import useSWR from 'swr'
import Error500 from '../../../pages/500'
import CustomCard from '@shared/ui/CustomCard'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { useSpecialistCategoryStore } from '@modules/specialistCategory/model/store'
import { ISpecialistCategory } from 'src/modules/specialistCategory'
import { SpecialistCategoryModals } from '@modules/specialistCategory/ui/SpecialistCategoryModals'
import { SpecialistCategoriesTable } from '@modules/specialistCategory/ui/SpecialistCategoriesTable'

function SpecialistCategories() {
  const [handleCreateOpen] = useSpecialistCategoryStore(({handleCreateOpen}) => [handleCreateOpen])
  const {
    data: specialistCategories,
    isValidating,
    isLoading,
    error,
    mutate,
  } = useSWR<{ data: ISpecialistCategory[] }>('/specialist-categories', getFetcher)

  if (error) {
    return <Error500/>
  }

  return (
    <CustomCard>
      <SpecialistCategoryModals mutate={mutate}/>
      <CustomPageHeader
        handleOpen={handleCreateOpen}
        title="Категории специалистов"
        buttonName="Создать"
      />
      <SpecialistCategoriesTable
        mutate={mutate}
        loading={isLoading || isValidating}
        specialistCategories={specialistCategories?.data || []}
      />
    </CustomCard>
  )
}

export { SpecialistCategories }
