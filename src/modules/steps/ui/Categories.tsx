import { useCategoryStore } from '@modules/steps/model/store'
import useSWR from 'swr'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { ICategory } from '@modules/catalog'
import Error500 from '../../../pages/500'
import CustomCard from '@shared/ui/CustomCard'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { langSelector, useLanguageStore } from '@shared/model/store'
import { CategoryModals } from './CategoryModals'
import { CategoriesTable } from './CategoriesTable'
import { useRouter } from 'next/router'
import { ITour } from '@modules/provider'
import { Button, IconButton, Link } from '@mui/material'
import { Icon } from '@iconify/react'

function Steps() {
  const lang = useLanguageStore(langSelector)
  let router = useRouter()
  const [handleCreateOpen] = useCategoryStore(({ handleCreateOpen }) => [handleCreateOpen])
  const {
    data,
    isValidating,
    isLoading,
    error,
    mutate,
  } = useSWR<ITour>(`/tour/${router.query.id}?lang=${lang}`, getFetcher)

  // console.log(data)
  // debugger
  if (error) {
    // console.log(error)
    return <Error500 />
  }

  return (
    <CustomCard>
      <CategoryModals mutate={mutate} />
      <CustomPageHeader
        handleOpen={handleCreateOpen}
        title={<>
          <IconButton
            title="Назад"
            sx={{ mr: 4 }}
            href="/main/tour"
            component={Link}
          >
            <Icon icon="ep:back" />
          </IconButton>
          Шаги "{data?.name || ''}"
        </>}
        buttonName="Добавить шаги"
      />
      <CategoriesTable
        loading={isLoading || isValidating}
        categories={data?.steps || []}
        mutate={mutate}
      />
    </CustomCard>
  )
}

export { Steps }
