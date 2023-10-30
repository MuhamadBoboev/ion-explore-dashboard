import useSWRMutation from 'swr/mutation'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import { DataGrid } from '@mui/x-data-grid'
import { LinearProgress } from '@mui/material'
import { ICollectionData } from '@modules/collection/model/ICollection'
import { useCollectionStore } from '@modules/collection/model/store'
import { collectionColumns } from '@modules/collection/model/collectionColumns'
import { PaginationModelType } from '@shared/lib/PaginationModelType'
import { Dispatch, SetStateAction } from 'react'
import { KeyedMutator } from 'swr'

interface Props {
  loading: boolean
  collections?: ICollectionData
  paginationModel: PaginationModelType
  setPaginationModel: Dispatch<SetStateAction<PaginationModelType>>
  mutate: KeyedMutator<any>
}

function CollectionsTable({collections, loading, paginationModel, setPaginationModel, mutate}: Props) {
  const {trigger} = useSWRMutation('/collections', deleteFetcher)
  const [handleUpdateOpen] = useCollectionStore(({handleUpdateOpen}) => [handleUpdateOpen])

  return (
    <DataGrid
      slots={{loadingOverlay: LinearProgress}}
      loading={loading}
      columns={collectionColumns({handleUpdateOpen, trigger, mutate})}
      rows={collections?.data || []}
      rowSelection={false}
      pagination
      paginationModel={paginationModel}
      pageSizeOptions={[5, 10, 15, 20, 25, 30, 35]}
      paginationMode="server"
      onPaginationModelChange={async (model) => {
        setPaginationModel(model)
        await mutate(collections, {
          revalidate: true,
        })
      }}
      rowCount={collections?.meta?.total}
      autoHeight
      localeText={{
        noRowsLabel: 'Пусто'
      }}
    />
  )
}

export { CollectionsTable }
