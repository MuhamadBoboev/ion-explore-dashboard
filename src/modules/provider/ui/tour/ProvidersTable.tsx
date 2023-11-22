import useSWRMutation from 'swr/mutation'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import { DataGrid } from '@mui/x-data-grid'
import { LinearProgress } from '@mui/material'
// import { IProvider } from '@modules/provider/model/'
import { useProviderStore } from '@modules/provider/model/store'
import { providerColumns } from '@modules/provider/model/providerColumns'
import { KeyedMutator } from 'swr'
import { ITour } from '@modules/provider/model/ITour'

interface Props {
  mutate: KeyedMutator<any>
  loading: boolean
  providers: ITour[]
}

function ProvidersTable({ mutate, providers, loading }: Props) {
  const { trigger } = useSWRMutation('/tour', deleteFetcher)
  const [handleUpdateOpen] = useProviderStore(({ handleUpdateOpen }) => [handleUpdateOpen])

  return (
    <DataGrid
      slots={{ loadingOverlay: LinearProgress }}
      hideFooter
      loading={loading}
      columns={providerColumns({ mutate, handleUpdateOpen, trigger })}
      rows={providers}
      rowSelection={false}
      autoHeight
      localeText={{
        noRowsLabel: 'Пусто'
      }}
    />
  )
}

export { ProvidersTable }
