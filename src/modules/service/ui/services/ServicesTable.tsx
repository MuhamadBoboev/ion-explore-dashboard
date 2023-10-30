import useSWRMutation from 'swr/mutation'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import { DataGrid } from '@mui/x-data-grid'
import { LinearProgress } from '@mui/material'
import { IServiceData } from '@modules/service/model/services/IService'
import { useServiceStore } from '@modules/service/model/services/store'
import { Dispatch, SetStateAction } from 'react'
import { KeyedMutator } from 'swr'
import { serviceColumns } from '@modules/service/model/services/serviceColumns'
import { PaginationModelType } from '@shared/lib/PaginationModelType'

interface Props {
  loading: boolean
  services?: IServiceData
  paginationModel: PaginationModelType
  setPaginationModel: Dispatch<SetStateAction<PaginationModelType>>
  mutate: KeyedMutator<any>
}

function ServicesTable({services, loading, paginationModel, setPaginationModel, mutate}: Props) {
  const {trigger} = useSWRMutation('/services', deleteFetcher)
  const [handleUpdateOpen] = useServiceStore(({handleUpdateOpen}) => [handleUpdateOpen])

  return (
    <DataGrid
      slots={{loadingOverlay: LinearProgress}}
      loading={loading}
      columns={serviceColumns({handleUpdateOpen, trigger, mutate})}
      rows={services?.data || []}
      rowSelection={false}
      pagination
      paginationModel={paginationModel}
      pageSizeOptions={[5, 10, 15, 20, 25, 30, 35]}
      paginationMode="server"
      onPaginationModelChange={async (model) => {
        setPaginationModel(model)
        await mutate(services, {
          revalidate: true,
        })
      }}
      rowCount={services?.meta?.total}
      autoHeight
      localeText={{
        noRowsLabel: 'Пусто'
      }}
    />
  )
}

export { ServicesTable }
