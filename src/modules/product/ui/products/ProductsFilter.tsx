import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { ICategory, ISubcategory } from '@modules/catalog'
import { IProvider } from '@modules/provider'
import { ICollection } from '@modules/collection'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import { Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import ModalFormControl from '@shared/ui/ModalFormControl'
import Button from '@mui/material/Button'
import { arrayToSearchQuery } from '@modules/product/lib/arrayToSearchQuery'
import Grid from '@mui/material/Grid'

interface Props {
  isOpen: boolean
  setQuery: Dispatch<SetStateAction<string>>
  categories: ICategory[]
  providers: IProvider[]
  collections: ICollection[]
  selectedCategories: number[]
  setSelectedCategories: Dispatch<SetStateAction<number[]>>
  selectedSubcategories: number[]
  setSelectedSubcategories: Dispatch<SetStateAction<number[]>>
  selectedProviders: number[]
  setSelectedProviders: Dispatch<SetStateAction<number[]>>
  selectedCollections: number[]
  setSelectedCollections: Dispatch<SetStateAction<number[]>>
  setInputValue: Dispatch<SetStateAction<string>>
  setSearch: Dispatch<SetStateAction<string>>
  setPaginationModel: Dispatch<SetStateAction<{
    pageSize: number
    page: number
  }>>
  paginationModel: {
    pageSize: number
    page: number
  }

  close(): void
}

function ProductsFilter({
                          isOpen,
                          categories,
                          providers,
                          collections,
                          setSearch,
                          setInputValue,
                          setQuery,
                          selectedCollections,
                          setSelectedCategories,
                          setSelectedCollections,
                          setSelectedSubcategories,
                          selectedSubcategories,
                          selectedCategories,
                          selectedProviders,
                          setSelectedProviders,
                          setPaginationModel,
                          paginationModel,
                        }: Props) {

  const filteredSubcategories = useMemo(() => {
    const filtered: ISubcategory[] = []
    const categoriesElements = categories.filter(category => selectedCategories.includes(category.id))
    categoriesElements.forEach(category => {
      filtered.push(...category.subcategories)
    })
    return filtered
  }, [categories, selectedCategories])

  if (!isOpen) {
    return null
  }

  return (
    <Grid container p={8} spacing={5}>
      <Grid item xs={3}>
        <ModalFormControl>
          <InputLabel id="select-category" size="small">Категория</InputLabel>
          <Select
            labelId="select-category"
            id="select-category"
            label="Категория"
            size="small"
            multiple
            value={selectedCategories}
            onChange={(event) => {
              const value = event.target.value
              setSelectedCategories(Array.isArray(value) ? value : [])
            }}
          >
            {categories.map(({id, name}) => (
              <MenuItem value={id}>{name}</MenuItem>
            ))}
          </Select>
        </ModalFormControl>
      </Grid>
      <Grid item xs={3}>
        <ModalFormControl>
          <InputLabel id="select-subcategory" size="small">Подкатегория</InputLabel>
          <Select
            labelId="select-subcategory"
            id="select-subcategory"
            label="Подкатегория"
            multiple
            size="small"
            value={selectedSubcategories}
            onChange={(event) => {
              const value = event.target.value
              setSelectedSubcategories(Array.isArray(value) ? value : [])
            }}
          >
            {filteredSubcategories.map(({id, name}) => (
              <MenuItem value={id}>{name}</MenuItem>
            ))}
          </Select>
        </ModalFormControl>
      </Grid>
      <Grid item xs={3}>
        <ModalFormControl>
          <InputLabel id="select-provider" size="small">Поставщики</InputLabel>
          <Select
            labelId="select-provider"
            id="select-provider"
            label="Поставщики"
            multiple
            size="small"
            value={selectedProviders}
            onChange={(event) => {
              const value = event.target.value
              setSelectedProviders(Array.isArray(value) ? value : [])
            }}
          >
            {providers.map(({id, name}) => (
              <MenuItem value={id}>{name}</MenuItem>
            ))}
          </Select>
        </ModalFormControl>
      </Grid>
      <Grid item xs={3}>
        <ModalFormControl fullWidth>
          <InputLabel id="select-collection" size="small">Коллекция</InputLabel>
          <Select
            labelId="select-collection"
            id="select-collection"
            label="Коллекция"
            size="small"
            multiple
            value={selectedCollections}
            onChange={(event) => {
              const value = event.target.value
              setSelectedCollections(Array.isArray(value) ? value : [])
            }}
          >
            {collections.map(({id, name}) => (
              <MenuItem value={id}>{name}</MenuItem>
            ))}
          </Select>
        </ModalFormControl>
      </Grid>
      <Grid item xs={3} ml="auto">
        <Button
          variant="outlined"
          size="medium"
          type="button"
          fullWidth
          onClick={() => {
            setInputValue('')
            setSearch('')
            setSelectedCategories([])
            setSelectedSubcategories([])
            setSelectedProviders([])
            setSelectedCollections([])
            setQuery('')
          }}
        >
          Очистить фильтр
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button
          type="button"
          variant="contained"
          size="medium"
          onClick={() => {
            let query = '&'
            if (selectedCategories.length) {
              query += `&${arrayToSearchQuery('category_id', selectedCategories)}`
            }
            if (selectedSubcategories.length) {
              query += `&${arrayToSearchQuery('subcategory_id', selectedSubcategories)}`
            }
            if (selectedProviders.length) {
              query += `&${arrayToSearchQuery('provider_id', selectedProviders)}`
            }
            if (selectedCollections.length) {
              query += `&${arrayToSearchQuery('collection_id', selectedCollections)}`
            }
            setQuery(query)
            setPaginationModel({
              ...paginationModel,
              page: 0,
            })
            // close()
          }}
        >
          Применить
        </Button>
      </Grid>
    </Grid>
  )
}

export { ProductsFilter }
