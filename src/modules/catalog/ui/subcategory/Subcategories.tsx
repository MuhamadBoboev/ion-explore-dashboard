import useSWR from 'swr'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { ICategory } from '@modules/catalog'
import Error500 from '../../../../pages/500'
import CustomCard from '@shared/ui/CustomCard'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { useSubcategoryStore } from '@modules/catalog/model/subcategory/store'
import { useRouter } from 'next/router'
import { SubcategoriesTable } from '@modules/catalog/ui/subcategory/SubcategoriesTable'
import { SubcategoryModals } from '@modules/catalog/ui/subcategory/SubcategoryModals'
import IconButton from '@mui/material/IconButton'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useLanguageStore } from '@shared/model/store'
import { debug } from 'console'

function Subcategories() {
  const { lang } = useLanguageStore(({ lang }) => ({ lang }))
  const [handleCreateOpen] = useSubcategoryStore(({ handleCreateOpen }) => [handleCreateOpen])
  const router = useRouter()
  const {
    data,
    isValidating,
    isLoading,
    error,
    mutate,
  } = useSWR<ICategory>(`/category/${router.query.slug}?lang=${lang}`, getFetcher)


  if (error) {
    return <Error500 />
  }

  return (
    <CustomCard>
      <SubcategoryModals
        mutate={mutate}
        categoryId={data?.id || 0}
      />
      <CustomPageHeader
        handleOpen={handleCreateOpen}
        title={<>
          <IconButton
            title="Назад"
            sx={{ mr: 4 }}
            href="/main/categories"
            component={Link}
          >
            <Icon icon="ep:back" />
          </IconButton>
          Подкатегории "{data?.name || ''}"
        </>}
        buttonName="Создать"
      />
      <SubcategoriesTable
        loading={isLoading || isValidating}
        subcategories={data?.subcategory || []}
        mutate={mutate}
      />
    </CustomCard>
  )
}

export { Subcategories }
