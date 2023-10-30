import { useCategoryStore } from '@modules/catalog/model/category/store'
import useSWR from 'swr'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { ICategory } from '@modules/catalog'
import Error500 from '../../../../pages/500'
import CustomCard from '@shared/ui/CustomCard'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { CategoryModals } from '@modules/catalog/ui/category/CategoryModals'
import { CategoriesTable } from '@modules/catalog/ui/category/CategoriesTable'

function Categories() {
  const [handleCreateOpen] = useCategoryStore(({handleCreateOpen}) => [handleCreateOpen])
  const {
    data: categories,
    isValidating,
    isLoading,
    error,
    mutate,
  } = useSWR<{ data: ICategory[] }>('/categories', getFetcher)

  if (error) {
    return <Error500/>
  }

  return (
    <CustomCard>
      <CategoryModals mutate={mutate}/>
      <CustomPageHeader
        handleOpen={handleCreateOpen}
        title="Категории"
        buttonName="Создать"
      />
      <CategoriesTable
        loading={isLoading || isValidating}
        categories={categories?.data || []}
        mutate={mutate}
      />
    </CustomCard>
  )
}

export { Categories }
