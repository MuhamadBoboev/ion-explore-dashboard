import useSWR from 'swr'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import Error500 from '../../../../pages/500'
import CustomCard from '@shared/ui/CustomCard'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { useProjectStore } from '@modules/project/model/projects/store'
import { IProjectData } from '@modules/project/model/projects/IProject'
import { ProjectModals } from '@modules/project/ui/projects/ProjectModals'
import { ProjectsTable } from '@modules/project/ui/projects/ProjectsTable'
import { useState } from 'react'

function Projects() {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })
  const [handleCreateOpen] = useProjectStore(({handleCreateOpen}) => [handleCreateOpen])
  const {
    data: projects,
    isValidating,
    isLoading,
    error,
    mutate,
  } = useSWR<IProjectData>(`/projects?page=${paginationModel.page + 1}&per_page=${paginationModel.pageSize}`, getFetcher)

  if (error) {
    return <Error500/>
  }

  return (
    <CustomCard>
      <ProjectModals mutate={mutate}/>
      <CustomPageHeader
        handleOpen={handleCreateOpen}
        title="Проекты"
        buttonName="Добавить"
      />
      <ProjectsTable
        loading={isLoading || isValidating}
        projects={projects}
        mutate={mutate}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
      />
    </CustomCard>
  )
}

export { Projects }
