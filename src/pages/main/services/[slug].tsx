import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types'
import { axiosInstance } from '@shared/api/axiosInstance'
import { AxiosError } from 'axios'
import { SWRConfig } from 'swr'
import { ServiceImages } from '@modules/service'

export const getServerSideProps: GetServerSideProps = async (params) => {
  let service = null
  try {
    service = await axiosInstance.get(`/services/${params.query.slug}`)
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
        [`/services/${params.query.slug}`]: service?.data
      }
    }
  }
}

function Page({fallback}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <SWRConfig value={{
      fallback,
      revalidateOnFocus: false,
    }}>
      <ServiceImages/>
    </SWRConfig>
  )
}

export default Page
