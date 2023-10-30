import CustomCard from '@shared/ui/CustomCard'
import Typography from '@mui/material/Typography'
import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { IProductsData } from '@modules/product/model/IProduct'
import Box from '@mui/material/Box'
import { ProductsTable } from '@modules/product/ui/products/ProductsTable'
import Error500 from '../../../../pages/500'
import TextField from '@mui/material/TextField'
import { LoadingButton } from '@mui/lab'
import { Icon } from '@iconify/react'
import Button from '@mui/material/Button'
import { ICategory } from '@modules/catalog'
import { IProvider } from '@modules/provider'
import { ICollection } from '@modules/collection'
import { ProductsFilter } from '@modules/product/ui/products/ProductsFilter'

interface Props {
  categories: ICategory[]
  providers: IProvider[]
  collections: ICollection[]
}

function Products({categories, providers, collections}: Props) {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })
  /** @filter */
  const [search, setSearch] = useState('')
  const [isOpenFilter, setIsOpenFilter] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [selectedSubcategories, setSelectedSubcategories] = useState<number[]>([])
  const [selectedProviders, setSelectedProviders] = useState<number[]>([])
  const [selectedCollections, setSelectedCollections] = useState<number[]>([])

  const [query, setQuery] = useState('')

  const {
    data: products,
    isValidating,
    isLoading,
    error,
    mutate,
  } = useSWR<IProductsData>(`/products?page=${paginationModel.page + 1}&per_page=${paginationModel.pageSize}${search ? `&search=${search}` : ''}` + query, getFetcher, {
    keepPreviousData: true,
  })

  useEffect(() => {
    if (products) {
      if (paginationModel.page > 0) {
        if (products.meta.total === 0) {
          setPaginationModel({
            ...paginationModel,
            page: paginationModel.page - 1,
          })
        }
      }
    }
  }, [paginationModel, products])

  if (error) {
    return <Error500/>
  }

  return (
    <CustomCard
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box
        component="header"
        mb={5}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={5}
      >
        <Typography
          variant="h5"
          component="h1"
        >
          Товары
        </Typography>
        <Box>
          <TextField
            size="small"
            value={inputValue}
            placeholder="Поиск..."
            onChange={(event) => {
              setInputValue(event.target.value)
            }}
            onKeyUp={(event) => {
              if (event.code === 'Enter') {
                setSearch(inputValue)
                setPaginationModel({
                  ...paginationModel,
                  page: 0
                })
              }
            }}
            sx={{mr: 2}}
          />
          <LoadingButton
            loading={isValidating}
            type="button"
            size="large"
            variant="contained"
            sx={{minWidth: 'auto', px: 4, py: 3}}
            onClick={() => {
              setSearch(inputValue)
              setPaginationModel({
                ...paginationModel,
                page: 0
              })
            }}
          >
            <Icon icon="carbon:search"/>
          </LoadingButton>
        </Box>
        <Box>
          <Button
            variant="contained"
            size="medium"
            type="button"
            sx={{ml: 5}}
            onClick={() => {
              setIsOpenFilter(!isOpenFilter)
            }}
          >
            Фильтр
          </Button>
        </Box>
      </Box>
      <ProductsFilter
        isOpen={isOpenFilter}
        setQuery={setQuery}
        close={() => setIsOpenFilter(false)}
        categories={categories}
        providers={providers}
        collections={collections}
        selectedCategories={selectedCategories}
        selectedSubcategories={selectedSubcategories}
        selectedCollections={selectedCollections}
        setSelectedCategories={setSelectedCategories}
        setSelectedCollections={setSelectedCollections}
        setSelectedSubcategories={setSelectedSubcategories}
        selectedProviders={selectedProviders}
        setSelectedProviders={setSelectedProviders}
        setInputValue={setInputValue}
        setSearch={setSearch}
        setPaginationModel={setPaginationModel}
        paginationModel={paginationModel}
      />
      <ProductsTable
        mutate={mutate}
        loading={isLoading || isValidating}
        setPaginationModel={setPaginationModel}
        paginationModel={paginationModel}
        products={products}
      />
    </CustomCard>
  )
}

export { Products }
