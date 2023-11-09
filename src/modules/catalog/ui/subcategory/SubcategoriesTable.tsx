import useSWRMutation from 'swr/mutation'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import { DataGrid } from '@mui/x-data-grid'
import { LinearProgress } from '@mui/material'
import { ISubcategory } from '@modules/catalog'
import { useSubcategoryStore } from '@modules/catalog/model/subcategory/store'
import { subcategoryColumns } from '@modules/catalog/model/subcategory/subcategoryColumns'
import { KeyedMutator } from 'swr'

interface Props {
  loading: boolean
  subcategories: ISubcategory[]
  mutate: KeyedMutator<any>
}

function SubcategoriesTable({ subcategories, loading, mutate }: Props) {
  const { trigger } = useSWRMutation('/sub-category', deleteFetcher)
  const [handleUpdateOpen] = useSubcategoryStore(({ handleUpdateOpen }) => [handleUpdateOpen])

  console.log(subcategories)
  return (
    <DataGrid
      slots={{ loadingOverlay: LinearProgress }}
      hideFooter
      loading={loading}
      columns={subcategoryColumns({ handleUpdateOpen, trigger, mutate })}
      rows={subcategories}
      rowSelection={false}
      autoHeight
      localeText={{
        noRowsLabel: 'Пусто'
      }}
    />
  )
}

export { SubcategoriesTable }
