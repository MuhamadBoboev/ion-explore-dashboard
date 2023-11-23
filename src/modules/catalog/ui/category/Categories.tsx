import { useCategoryStore } from '@modules/catalog/model/category/store'
import useSWR from 'swr'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { ICategory } from '@modules/catalog'
import Error500 from '../../../../pages/500'
import CustomCard from '@shared/ui/CustomCard'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { CategoryModals } from '@modules/catalog/ui/category/CategoryModals'
import { CategoriesTable } from '@modules/catalog/ui/category/CategoriesTable'
import { langSelector, useLanguageStore } from '@shared/model/store'

function Categories() {
  const lang = useLanguageStore(langSelector)
  const [handleCreateOpen] = useCategoryStore(({ handleCreateOpen }) => [handleCreateOpen])
  const {
    data,
    isValidating,
    isLoading,
    error,
    mutate,
  } = useSWR<ICategory[]>(`/category/?lang=${lang}`, getFetcher)

  if (error) {
    console.log(error)
    return <Error500 />
  }

  return (
    <CustomCard>
      <CategoryModals mutate={mutate} />
      <CustomPageHeader
        handleOpen={handleCreateOpen}
        title="Категории"
        buttonName="Создать"
        withButton={false}
      />
      <CategoriesTable
        loading={isLoading || isValidating}
        categories={data || []}
        mutate={mutate}
      />
    </CustomCard>
  )
}

export { Categories }
