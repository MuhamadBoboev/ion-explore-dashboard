import { UpdateProduct } from '@modules/product/ui/updateProduct/UpdateProduct'
import { axiosInstance } from '@shared/api/axiosInstance'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next/types'
import { SWRConfig } from 'swr'
import { AxiosError } from 'axios'

export const getServerSideProps: GetServerSideProps = async (params) => {
  let product = null
  try {
    product = await axiosInstance.get(`/products/${params.query.slug}`)
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
        [`/products/${params.query.slug}`]: product?.data
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
      <UpdateProduct/>
    </SWRConfig>
  )
}

export default Page
