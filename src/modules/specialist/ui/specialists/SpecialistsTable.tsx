import useSWRMutation from 'swr/mutation'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import { DataGrid } from '@mui/x-data-grid'
import { LinearProgress } from '@mui/material'
import { ISpecialist } from '@modules/specialist/model/specialists/ISpecialist'
import { useSpecialistStore } from '@modules/specialist/model/specialists/store'
import { specialistColumns } from '@modules/specialist/model/specialists/specialistColumns'
import { Dispatch, SetStateAction } from 'react'
import { KeyedMutator } from 'swr'
import { PaginationModelType } from '@shared/lib/PaginationModelType'

interface Props {
  loading: boolean
  specialists?: ISpecialist[]
  mutate: KeyedMutator<any>
}

function SpecialistsTable({ specialists, loading, mutate }: Props) {
  const { trigger } = useSWRMutation('/guide', deleteFetcher)
  const [handleUpdateOpen] = useSpecialistStore(({ handleUpdateOpen }) => [handleUpdateOpen])

  console.log(specialists)
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
