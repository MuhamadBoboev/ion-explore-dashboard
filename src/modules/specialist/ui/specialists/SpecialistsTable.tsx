import useSWRMutation from 'swr/mutation'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import { DataGrid } from '@mui/x-data-grid'
import { LinearProgress } from '@mui/material'
import { ISpecialistData } from '@modules/specialist/model/specialists/ISpecialist'
import { useSpecialistStore } from '@modules/specialist/model/specialists/store'
import { specialistColumns } from '@modules/specialist/model/specialists/specialistColumns'
import { Dispatch, SetStateAction } from 'react'
import { KeyedMutator } from 'swr'
import { PaginationModelType } from '@shared/lib/PaginationModelType'

interface Props {
  loading: boolean
  specialists?: ISpecialistData
  paginationModel: PaginationModelType
  setPaginationModel: Dispatch<SetStateAction<PaginationModelType>>
  mutate: KeyedMutator<any>
}

function SpecialistsTable({specialists, loading, paginationModel, setPaginationModel, mutate}: Props) {
  const {trigger} = useSWRMutation('/specialists', deleteFetcher)
  const [handleUpdateOpen] = useSpecialistStore(({handleUpdateOpen}) => [handleUpdateOpen])

  return (
    <DataGrid
      slots={{loadingOverlay: LinearProgress}}
      loading={loading}
      columns={specialistColumns({handleUpdateOpen, trigger, mutate})}
      rows={specialists?.data || []}
      rowSelection={false}
      pagination
      paginationModel={paginationModel}
      pageSizeOptions={[5, 10, 15, 20, 25, 30, 35]}
      paginationMode="server"
      onPaginationModelChange={async (model) => {
        setPaginationModel(model)
        await mutate(specialists, {
          revalidate: true,
        })
      }}
      rowCount={specialists?.meta?.total}
      autoHeight
      localeText={{
        noRowsLabel: 'Пусто'
      }}
    />
  )
}

export { SpecialistsTable }
