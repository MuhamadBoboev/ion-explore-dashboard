import { Products } from '@modules/product'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types'
import { getCategories, ICategory } from '@modules/catalog'
import { getProviders, IProvider } from '@modules/provider'
import { getCollections, ICollection } from '@modules/collection'

type Props = {
  categories: ICategory[]
  providers: IProvider[]
  collections: ICollection[]
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const categories = await getCategories()
  const providers = await getProviders()
  const collections = await getCollections()

  return {
    props: {
      categories: categories || [],
      providers: providers || [],
      collections: collections || [],
    }
  }
}

function Page({categories, providers, collections}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
    <Products
      categories={categories}
      providers={providers}
      collections={collections}
    />
  )
}

export default Page
