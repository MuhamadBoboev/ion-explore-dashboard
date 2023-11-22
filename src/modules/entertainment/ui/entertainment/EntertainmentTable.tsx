import useSWRMutation from 'swr/mutation'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import { DataGrid } from '@mui/x-data-grid'
import { LinearProgress } from '@mui/material'
// import { IEntertainment } from '@modules/Entertainment/model/'
// import { useEntertainmentStore } from '@modules/Entertainment/model/store'
// import { EntertainmentColumns } from '@modules/Entertainment/model/EntertainmentColumns'
import { KeyedMutator } from 'swr'
import { IEntertainment } from '@modules/entertainment/model/IEntertainment'
import { useEntertainmentStore } from '@modules/entertainment/model/store'
import { entertainmentColumns } from '@modules/entertainment/model/entertaimentColumns'
// import { ITour } from '@modules/Entertainment/model/ITour'

interface Props {
  mutate: KeyedMutator<any>
  loading: boolean
  Entertainments: IEntertainment[]
}

function EntertainmentsTable({ mutate, Entertainments, loading }: Props) {
  const { trigger } = useSWRMutation('/entertainment', deleteFetcher)
  const [handleUpdateOpen] = useEntertainmentStore(({ handleUpdateOpen }) => [handleUpdateOpen])

  return (
    <DataGrid
      slots={{ loadingOverlay: LinearProgress }}
      hideFooter
      loading={loading}
      columns={entertainmentColumns({ mutate, handleUpdateOpen, trigger })}
      rows={Entertainments}
      rowSelection={false}
      autoHeight
      localeText={{
        noRowsLabel: 'Пусто'
      }}
    />
  )
}

export { EntertainmentsTable }
