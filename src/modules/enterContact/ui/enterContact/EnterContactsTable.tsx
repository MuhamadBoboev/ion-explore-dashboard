import useSWRMutation from 'swr/mutation'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import { DataGrid } from '@mui/x-data-grid'
import { LinearProgress } from '@mui/material'
import { KeyedMutator } from 'swr'
import { useEnterContactStore } from '@modules/enterContact/model/enterContacts/store'
import { enterContactColumns } from '@modules/enterContact/model/enterContacts/enterContactColumns'
import { IEnterContact } from '@modules/enterContact/model/enterContacts/IEnterContact'

interface Props {
  loading: boolean
  contacts: IEnterContact[]
  mutate: KeyedMutator<any>
}

function EnterContactsTable({ contacts, loading, mutate }: Props) {
  const { trigger } = useSWRMutation(`/entertainment/contacts`, deleteFetcher)
  const [handleUpdateOpen] = useEnterContactStore(({ handleUpdateOpen }) => [handleUpdateOpen])

  return (
    <DataGrid
      slots={{ loadingOverlay: LinearProgress }}
      hideFooter
      loading={loading}
      columns={enterContactColumns({ handleUpdateOpen, trigger, mutate })}
      rows={contacts}
      rowSelection={false}
      autoHeight
      localeText={{
        noRowsLabel: 'Пусто'
      }}
    />
  )
}

export { EnterContactsTable }
