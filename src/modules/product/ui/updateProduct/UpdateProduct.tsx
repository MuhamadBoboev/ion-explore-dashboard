import CustomCard from '@shared/ui/CustomCard'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Loader from '@shared/ui/Loader'
import Typography from '@mui/material/Typography'
import { IProduct } from '@modules/product'
import Box from '@mui/material/Box'
import { Tab, Tabs } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { UpdateProductMain } from '@modules/product/ui/updateProduct/UpdateProductMain'
import { notFound } from 'next/navigation'
import { ProductImages } from '@modules/product/ui/images/ProductImages'
import { ProductAttributes } from '@modules/product/ui/attributes/ProductAttributes'

type TabsValueType = 'main' | 'images' | 'attributes'

function UpdateProduct() {
  const router = useRouter()
  const [value, setValue] = useState<TabsValueType>('main')
  const {
    data: product,
    isLoading,
    mutate,
    isValidating,
    error,
  } = useSWR<{ data: IProduct }>(`/products/${router.query.slug}`, getFetcher)

  const handleChange = (event: SyntheticEvent, newValue: TabsValueType) => {
    setValue(newValue)
  }

  if (isLoading || isValidating) {
    return <Loader/>
  }

  if (error) {
    notFound()
  }

  return (
    <CustomCard>
      <Typography
        component="h1"
        variant="h5"
        mt={10}
        ml={10}
      >{product?.data.name}</Typography>
      <Box px={10} mt={5} mb={10}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Основное" value="main"/>
          <Tab label="Изображении" value="images"/>
          <Tab label="Атрибуты" value="attributes"/>
        </Tabs>
      </Box>
      <Box px={10} mb={5} pb={5}>
        {value === 'main' && product && <UpdateProductMain
          product={product.data}
          mutate={mutate}
        />}
        {value === 'images' && product && <ProductImages productId={product.data.id}/>}
        {value === 'attributes' && product && <ProductAttributes productId={product.data.id}/>}
      </Box>
    </CustomCard>
  )
}

export { UpdateProduct }
