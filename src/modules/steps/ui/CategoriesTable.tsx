import useSWRMutation from 'swr/mutation'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import { DataGrid } from '@mui/x-data-grid'
import { LinearProgress } from '@mui/material'
import { ICategory } from '@modules/catalog'
import { KeyedMutator } from 'swr'
import { langSelector, useLanguageStore } from '@shared/model/store'
import { useCategoryStore } from '../model/store'
import { categoryColumns } from '../model/categoryColumns'
import { IStepsItem } from '@modules/provider/model/ITour'

interface Props {
  loading: boolean
  categories: IStepsItem[]
  mutate: KeyedMutator<any>
}

function CategoriesTable({ categories, loading, mutate }: Props) {
  // const lang = useLanguageStore(langSelector)
  const { trigger } = useSWRMutation(`/tour/steps`, deleteFetcher)
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
