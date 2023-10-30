import useSWRMutation from 'swr/mutation'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import { DataGrid } from '@mui/x-data-grid'
import { LinearProgress } from '@mui/material'
import { ISpecialistCategory } from 'src/modules/specialistCategory'
import { useSpecialistCategoryStore } from '@modules/specialistCategory/model/store'
import { specialistCategoryColumns } from '@modules/specialistCategory/model/specialistCategoryColumns'
import { KeyedMutator } from 'swr'

interface Props {
  mutate: KeyedMutator<any>
  loading: boolean
  specialistCategories: ISpecialistCategory[]
}

function SpecialistCategoriesTable({mutate, specialistCategories, loading}: Props) {
  const {trigger} = useSWRMutation('/specialist-categories', deleteFetcher)
  const [handleUpdateOpen] = useSpecialistCategoryStore(({handleUpdateOpen}) => [handleUpdateOpen])

  return (
    <DataGrid
      slots={{loadingOverlay: LinearProgress}}
      hideFooter
      loading={loading}
      columns={specialistCategoryColumns({mutate, handleUpdateOpen, trigger})}
      rows={specialistCategories}
      rowSelection={false}
      autoHeight
      localeText={{
        noRowsLabel: 'Пусто'
      }}
    />
  )
}

export { SpecialistCategoriesTable }
