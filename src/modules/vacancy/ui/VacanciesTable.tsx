import useSWRMutation from 'swr/mutation'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import { DataGrid } from '@mui/x-data-grid'
import { LinearProgress } from '@mui/material'
import { vacancyColumns } from '@modules/vacancy/model/vacancyColumns'
import { Dispatch, SetStateAction } from 'react'
import { IVacanciesData } from '@modules/vacancy/model/IVacancy'
import { KeyedMutator } from 'swr'

type PaginationModelType = {
  pageSize: number,
  page: number
}

interface Props {
  loading: boolean
  vacancies?: IVacanciesData
  paginationModel: PaginationModelType
  setPaginationModel: Dispatch<SetStateAction<PaginationModelType>>
  mutate: KeyedMutator<any>
}

function VacanciesTable({vacancies, loading, paginationModel, setPaginationModel, mutate}: Props) {
  const {trigger} = useSWRMutation('/vacancies', deleteFetcher)

  return (
    <DataGrid
      slots={{loadingOverlay: LinearProgress}}
      loading={loading}
      columns={vacancyColumns({trigger, mutate})}
      rows={vacancies?.data || []}
      rowSelection={false}
      pagination
      paginationModel={paginationModel}
      pageSizeOptions={[5, 10, 15, 20, 25, 30, 35]}
      paginationMode="server"
      onPaginationModelChange={async (model) => {
        setPaginationModel(model)
        await mutate(vacancies, {
          revalidate: true,
        })
      }}
      rowCount={vacancies?.meta?.total}
      autoHeight
      localeText={{
        noRowsLabel: 'Пусто'
      }}
    />
  )
}

export { VacanciesTable }
