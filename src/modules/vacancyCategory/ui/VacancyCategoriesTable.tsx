import useSWRMutation from 'swr/mutation'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import { DataGrid } from '@mui/x-data-grid'
import { LinearProgress } from '@mui/material'
import { KeyedMutator } from 'swr'
import { IVacancyCategory } from '@modules/vacancyCategory/model/IVacancyCategory'
import { useVacancyCategoryStore } from '@modules/vacancyCategory/model/store'
import { vacancyCategoryColumns } from '@modules/vacancyCategory/model/vacancyCategoryColumns'

interface Props {
  mutate: KeyedMutator<any>
  loading: boolean
  vacancyCategories: IVacancyCategory[]
}

function VacancyCategoriesTable({mutate, vacancyCategories, loading}: Props) {
  const {trigger} = useSWRMutation('/vacancy-categories', deleteFetcher)
  const [handleUpdateOpen] = useVacancyCategoryStore(({handleUpdateOpen}) => [handleUpdateOpen])

  return (
    <DataGrid
      slots={{loadingOverlay: LinearProgress}}
      hideFooter
      loading={loading}
      columns={vacancyCategoryColumns({mutate, handleUpdateOpen, trigger})}
      rows={vacancyCategories}
      rowSelection={false}
      autoHeight
      localeText={{
        noRowsLabel: 'Пусто'
      }}
    />
  )
}

export { VacancyCategoriesTable }
