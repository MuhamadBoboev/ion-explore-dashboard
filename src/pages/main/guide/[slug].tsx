import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types'
import { axiosInstance } from '@shared/api/axiosInstance'
import { AxiosError } from 'axios'
import { SWRConfig } from 'swr'
import { SpecialistImages } from '@modules/specialist'

export const getServerSideProps: GetServerSideProps = async (params) => {
  let specialist = null
  try {
    specialist = await axiosInstance.get(`/specialists/${params.query.slug}`)
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
        [`/specialists/${params.query.slug}`]: specialist?.data
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
      <SpecialistImages/>
    </SWRConfig>
  )
}

export default Page
