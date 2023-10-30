import useSWR from 'swr'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import Error500 from '../../../../pages/500'
import CustomCard from '@shared/ui/CustomCard'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { useSpecialistStore } from '@modules/specialist/model/specialists/store'
import { ISpecialistData } from '@modules/specialist/model/specialists/ISpecialist'
import { SpecialistModals } from '@modules/specialist/ui/specialists/SpecialistModals'
import { SpecialistsTable } from '@modules/specialist/ui/specialists/SpecialistsTable'
import { useState } from 'react'

function Specialists() {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })
  const [handleCreateOpen] = useSpecialistStore(({handleCreateOpen}) => [handleCreateOpen])
  const {
    data: specialists,
    isValidating,
    isLoading,
    error,
    mutate,
  } = useSWR<ISpecialistData>(`/specialists?page=${paginationModel.page + 1}&per_page=${paginationModel.pageSize}`, getFetcher)

  if (error) {
    return <Error500/>
  }

  return (
    <CustomCard>
      <SpecialistModals mutate={mutate}/>
      <CustomPageHeader
        handleOpen={handleCreateOpen}
        title="Специалисты"
        buttonName="Добавить"
      />
      <SpecialistsTable
        loading={isLoading || isValidating}
        specialists={specialists}
        mutate={mutate}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
      />
    </CustomCard>
  )
}

export { Specialists }
