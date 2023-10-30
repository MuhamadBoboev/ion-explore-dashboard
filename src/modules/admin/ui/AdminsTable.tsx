import useSWRMutation from 'swr/mutation'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import { DataGrid } from '@mui/x-data-grid'
import { LinearProgress } from '@mui/material'
import { IUser } from '@modules/user'
import { useAdminStore } from '@modules/admin/model/store'
import { adminColumns } from '@modules/admin/model/adminColumns'
import { KeyedMutator } from 'swr'

interface Props {
  loading: boolean
  admins: IUser[]
  mutate: KeyedMutator<any>
}

function AdminsTable({admins, loading, mutate}: Props) {
  const {trigger} = useSWRMutation('/users', deleteFetcher)
  const [handleUpdateOpen] = useAdminStore(({handleUpdateOpen}) => [handleUpdateOpen])

  return (
    <DataGrid
      slots={{loadingOverlay: LinearProgress}}
      hideFooter
      loading={loading}
      columns={adminColumns({handleUpdateOpen, trigger, mutate})}
      rows={admins}
      rowSelection={false}
      autoHeight
      localeText={{
        noRowsLabel: 'Пусто'
      }}
    />
  )
}

export { AdminsTable }
