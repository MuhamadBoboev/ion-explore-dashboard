import useSWRMutation from 'swr/mutation'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import { DataGrid } from '@mui/x-data-grid'
import { LinearProgress } from '@mui/material'
import { IAttribute } from '@modules/attribute/model/IAttribute'
import { useAttributeStore } from '@modules/attribute/model/store'
import { attributeColumns } from '@modules/attribute/model/attributeColumns'
import { KeyedMutator } from 'swr'

interface Props {
  loading: boolean
  attributes: IAttribute[]
  mutate: KeyedMutator<any>
}

function AttributesTable({attributes, loading, mutate}: Props) {
  const {trigger} = useSWRMutation('/attributes', deleteFetcher)
  const [handleUpdateOpen] = useAttributeStore(({handleUpdateOpen}) => [handleUpdateOpen])

  return (
    <DataGrid
      slots={{loadingOverlay: LinearProgress}}
      hideFooter
      loading={loading}
      columns={attributeColumns({handleUpdateOpen, trigger, mutate})}
      rows={attributes}
      rowSelection={false}
      autoHeight
      localeText={{
        noRowsLabel: 'Пусто'
      }}
    />
  )
}

export { AttributesTable }
