import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types'
import { axiosInstance } from '@shared/api/axiosInstance'
import { AxiosError } from 'axios'
import { SWRConfig } from 'swr'
import { UpdateVacancy } from '@modules/vacancy'

export const getServerSideProps: GetServerSideProps = async (params) => {
  let vacancy = null
  let vacancyCategories = null
  try {
    vacancy = await axiosInstance.get(`/vacancies/${params.query.slug}`)
    vacancyCategories = await axiosInstance.get(`/vacancy-categories`)
  } catch (e) {
    const error = e as AxiosError<any>
    if (error.response?.status === 404) {
      return {
        notFound: true
      }
    }
  }

  return {
    props: {
      fallback: {
        [`/vacancies/${params.query.slug}`]: vacancy?.data,
        [`/vacancy-categories`]: vacancyCategories?.data,
      }
    }
  }
}

function VacancyPage({fallback}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <SWRConfig value={{
      fallback,
      revalidateOnFocus: false,
    }}>
      <UpdateVacancy/>
    </SWRConfig>
  )
}

export default VacancyPage
