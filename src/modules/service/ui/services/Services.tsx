import useSWR from 'swr'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import Error500 from '../../../../pages/500'
import CustomCard from '@shared/ui/CustomCard'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { useServiceStore } from '@modules/service/model/services/store'
import { IServiceData } from '@modules/service/model/services/IService'
import { ServiceModals } from '@modules/service/ui/services/ServiceModals'
import { ServicesTable } from '@modules/service/ui/services/ServicesTable'
import { useState } from 'react'

function Services() {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })
  const [handleCreateOpen] = useServiceStore(({handleCreateOpen}) => [handleCreateOpen])
  const {
    data: services,
    isValidating,
    isLoading,
    error,
    mutate,
  } = useSWR<IServiceData>(`/services?page=${paginationModel.page + 1}&per_page=${paginationModel.pageSize}`, getFetcher)

  if (error) {
    return <Error500/>
  }

  return (
    <CustomCard>
      <ServiceModals mutate={mutate}/>
      <CustomPageHeader
        handleOpen={handleCreateOpen}
        title="Услуги"
        buttonName="Добавить"
      />
      <ServicesTable
        loading={isLoading || isValidating}
        services={services}
        mutate={mutate}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
      />
    </CustomCard>
  )
}

export { Services }
