import { DataGrid } from '@mui/x-data-grid'
import { LinearProgress } from '@mui/material'
import { IUserData } from '@modules/user/model/IUser'
import { userColumns } from '@modules/user/model/userColumns'
import { Dispatch, SetStateAction } from 'react'
import { KeyedMutator } from 'swr'
import { PaginationModelType } from '@shared/lib/PaginationModelType'

interface Props {
  loading: boolean
  users?: IUserData
  paginationModel: PaginationModelType
  setPaginationModel: Dispatch<SetStateAction<PaginationModelType>>
  mutate: KeyedMutator<any>
}

function UsersTable({users, loading, paginationModel, setPaginationModel, mutate}: Props) {

  return (
    <DataGrid
      slots={{loadingOverlay: LinearProgress}}
      loading={loading}
      columns={userColumns()}
      rows={users?.data || []}
      rowSelection={false}
      pagination
      paginationModel={paginationModel}
      pageSizeOptions={[5, 10, 15, 20, 25, 30, 35]}
      paginationMode="server"
      onPaginationModelChange={async (model) => {
        setPaginationModel(model)
        await mutate(users, {
          revalidate: true,
        })
      }}
      rowCount={users?.meta?.total}
      autoHeight
      localeText={{
        noRowsLabel: 'Пусто'
      }}
    />
  )
}

export { UsersTable }
