import useSWRMutation from 'swr/mutation'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import { DataGrid } from '@mui/x-data-grid'
import { LinearProgress } from '@mui/material'
import { ICategory } from '@modules/catalog'
import { useCategoryStore } from '@modules/catalog/model/category/store'
import { categoryColumns } from '@modules/catalog/model/category/categoryColumns'
import { KeyedMutator } from 'swr'
import { langSelector, useLanguageStore } from '@shared/model/store'

interface Props {
  loading: boolean
  categories: ICategory[]
  mutate: KeyedMutator<any>
}

function CategoriesTable({ categories, loading, mutate }: Props) {
  const lang = useLanguageStore(langSelector)
  const { trigger } = useSWRMutation(`/category/?lang=${lang}`, deleteFetcher)
  const [handleUpdateOpen] = useCategoryStore(({ handleUpdateOpen }) => [handleUpdateOpen])

  return (
    <DataGrid
      slots={{ loadingOverlay: LinearProgress }}
      hideFooter
      loading={loading}
      columns={categoryColumns({ handleUpdateOpen, trigger, mutate })}
      rows={categories}
      rowSelection={false}
      autoHeight
      localeText={{
        noRowsLabel: 'Пусто'
      }}
    />
  )
}

export { CategoriesTable }
