import useSWR from 'swr'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import Error500 from '../../../pages/500'
import CustomCard from '@shared/ui/CustomCard'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { VacanciesTable } from '@modules/vacancy/ui/VacanciesTable'
import { IVacanciesData } from '@modules/vacancy/model/IVacancy'
import { useEffect, useState } from 'react'

function Vacancies() {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })
  const {
    data: vacancies,
    isValidating,
    isLoading,
    error,
    mutate,
  } = useSWR<IVacanciesData>(`/vacancies?page=${paginationModel.page + 1}&per_page=${paginationModel.pageSize}`, getFetcher, {
    keepPreviousData: true,
  })

  useEffect(() => {
    if (vacancies) {
      if (paginationModel.page > 0) {
        if (vacancies.meta.total === 0) {
          setPaginationModel({
            ...paginationModel,
            page: paginationModel.page - 1,
          })
        }
      }
    }
  }, [paginationModel, vacancies])

  if (error) {
    return <Error500/>
  }

  return (
    <CustomCard>
      <CustomPageHeader
        title="Вакансии"
        withButton={false}
      />
      <VacanciesTable
        vacancies={vacancies}
        loading={isLoading || isValidating}
        mutate={mutate}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
      />
    </CustomCard>
  )
}

export { Vacancies }
