import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types'
import { axiosInstance } from '@shared/api/axiosInstance'
import { AxiosError } from 'axios'
import { SWRConfig } from 'swr'
import { ProjectImages } from '@modules/project'

export const getServerSideProps: GetServerSideProps = async (params) => {
  let project = null
  try {
    project = await axiosInstance.get(`/projects/${params.query.slug}`)
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
        [`/projects/${params.query.slug}`]: project?.data
      }
    }
  }
}

function Page({ fallback }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <SWRConfig value={{
      fallback,
      revalidateOnFocus: false,
    }}>
      <ProjectImages />
    </SWRConfig>
  )
}

export default Page
