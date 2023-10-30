import useSWRMutation from 'swr/mutation'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import { DataGrid } from '@mui/x-data-grid'
import { LinearProgress } from '@mui/material'
import { IProjectData } from '@modules/project/model/projects/IProject'
import { useProjectStore } from '@modules/project/model/projects/store'
import { projectColumns } from '@modules/project/model/projects/projectColumns'
import { Dispatch, SetStateAction } from 'react'
import { KeyedMutator } from 'swr'
import { PaginationModelType } from '@shared/lib/PaginationModelType'

interface Props {
  loading: boolean
  projects?: IProjectData
  paginationModel: PaginationModelType
  setPaginationModel: Dispatch<SetStateAction<PaginationModelType>>
  mutate: KeyedMutator<any>
}

function ProjectsTable({projects, loading, paginationModel, setPaginationModel, mutate}: Props) {
  const {trigger} = useSWRMutation('/projects', deleteFetcher)
  const [handleUpdateOpen] = useProjectStore(({handleUpdateOpen}) => [handleUpdateOpen])

  return (
    <DataGrid
      slots={{loadingOverlay: LinearProgress}}
      loading={loading}
      columns={projectColumns({handleUpdateOpen, trigger, mutate})}
      rows={projects?.data || []}
      rowSelection={false}
      pagination={true}
      paginationModel={paginationModel}
      pageSizeOptions={[5, 10, 15, 20, 25, 30, 35]}
      paginationMode="server"
      onPaginationModelChange={async (model) => {
        setPaginationModel(model)
        await mutate(projects, {
          revalidate: true,
        })
      }}
      rowCount={projects?.meta?.total}
      autoHeight
      localeText={{
        noRowsLabel: 'Пусто'
      }}
    />
  )
}

export { ProjectsTable }
