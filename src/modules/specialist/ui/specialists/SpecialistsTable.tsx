import useSWRMutation from 'swr/mutation'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import { DataGrid } from '@mui/x-data-grid'
import { LinearProgress } from '@mui/material'
import { ISpecialist } from '@modules/specialist/model/specialists/ISpecialist'
import { useSpecialistStore } from '@modules/specialist/model/specialists/store'
import { specialistColumns } from '@modules/specialist/model/specialists/specialistColumns'
import { KeyedMutator } from 'swr'

interface Props {
  loading: boolean
  specialists?: ISpecialist[]
  mutate: KeyedMutator<any>
}

function SpecialistsTable({ specialists, loading, mutate }: Props) {
  const { trigger } = useSWRMutation('/guide', deleteFetcher)
  const [handleUpdateOpen] = useSpecialistStore(({ handleUpdateOpen }) => [handleUpdateOpen])

  return (
    <DataGrid
      slots={{ loadingOverlay: LinearProgress }}
      loading={loading}
      columns={specialistColumns({ handleUpdateOpen, trigger, mutate })}
      rows={specialists || []}
      rowSelection={false}
      autoHeight
      localeText={{
        noRowsLabel: 'Пусто'
      }}
    />
  )
}

export { SpecialistsTable }
