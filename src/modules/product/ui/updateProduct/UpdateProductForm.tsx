import { Control, Controller, FieldErrors, UseFormGetValues, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { UpdateProductFormData } from '@modules/product/model/updateProduct/UpdateProductFormData'
import Grid from '@mui/material/Grid'
import TextFieldCustom from '@shared/ui/TextFieldCustom'
import Typography from '@mui/material/Typography'
import { EditorWrapper } from '../../../../@core/styles/libs/react-draft-wysiwyg'
import ReactDraftWysiwyg from '../../../../@core/components/react-draft-wysiwyg'
import { useEffect, useMemo, useState } from 'react'
import { EditorState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import ModalFormControl from '@shared/ui/ModalFormControl'
import InputLabel from '@mui/material/InputLabel'
import { Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import useSWR from 'swr'
import { IProductType } from '@modules/productType'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { stateFromHTML } from 'draft-js-import-html'
import { stateToHTML } from 'draft-js-export-html'
import { IProvider } from '@modules/provider'
import { ICollection } from '@modules/collection'
import { ICategory, ISubcategory } from '@modules/catalog'
import { IService } from '@modules/service'

interface Props {
  description: string | null
  errors: FieldErrors<UpdateProductFormData>
  control: Control<UpdateProductFormData>
  setValue: UseFormSetValue<UpdateProductFormData>
  getValues: UseFormGetValues<UpdateProductFormData>
  watch: UseFormWatch<UpdateProductFormData>
}

function UpdateProductForm({description, errors, control, setValue, watch, getValues}: Props) {
  const [descriptionState, setDescriptionState] = useState(
    EditorState.createWithContent(stateFromHTML(description || ''))
  )
  const [categories, setCategories] = useState<ICategory[]>([])
  const [subcategories, setSubcategories] = useState<ISubcategory[]>([])
  const [services, setServices] = useState<IService[]>([])
  const [openCategory, setOpenCategory] = useState(false)
  const [openSubcategory, setOpenSubcategory] = useState(false)
  const [openCollection, setOpenCollection] = useState(false)

  const {data: productTypes} = useSWR<{ data: IProductType[] }>('/product-types', getFetcher)
  const {data: providers} = useSWR<{ data: IProvider[] }>('/providers', getFetcher)
  const {data: collections} = useSWR<{ data: ICollection[] }>('/collections', getFetcher)

  useEffect(() => {
    setValue(
      'description',
      stateToHTML(descriptionState.getCurrentContent())
    )
  }, [descriptionState])

  useEffect(() => {
    if (providers) {
      const provider = providers.data.find(({id}) => getValues('provider_id') === id)
      setCategories(provider?.categories || [])
      setSubcategories([])
    }
  }, [watch('provider_id'), providers])

  useEffect(() => {
    if (providers) {
      const categoryId = getValues('category_id')
      if (categoryId && categoryId[0]) {
        const selectedCategoryId = categoryId[0]
        if (selectedCategoryId) {
          const providerId = getValues('provider_id')
          const provider = providers?.data.find(({id}) => id === providerId)
          setSubcategories(provider?.subcategories.filter(
            (subcategory) => subcategory.category_id === selectedCategoryId
          ) || [])
        }
      }
    }
  }, [watch('category_id'), providers])

  useEffect(() => {
    const category_id = getValues('category_id')
    if (category_id && category_id[0]) {
      const category = categories.find(category => category.id === category_id[0])
      if (category) {
        setServices(category.services)
        const subcategory_id = getValues('subcategory_id')
        if (subcategory_id) {
          if (subcategory_id[0]) {
            const subcategory = subcategories.find(subcategory => subcategory.id === subcategory_id[0])
            if (subcategory) {
              if (subcategory.services.length !== 0) {
                setServices(subcategory.services)
              }
            }
          } else {
            setServices(category.services)
          }
        }
      }
    } else {
      setServices([])
    }
  }, [categories, subcategories, watch('category_id'), watch('subcategory_id')])

  const filteredCollections = useMemo(() => {
    return collections
      ?.data
      .filter(({provider}) => getValues('provider_id') === provider.id)
      .filter(({category}) => {
        const categoryId = getValues('category_id')
        if (!categoryId || !categoryId[0]) {
          return false
        }
        return category.id === categoryId[0]
      })
      .filter(({subcategory}) => {
        const subcategoryId = getValues('subcategory_id')
        if (!subcategoryId || !subcategoryId[0]) {
          return true
        }
        return subcategory?.id === subcategoryId[0]
      }) || []
  }, [watch('provider_id'), watch('category_id'), watch('subcategory_id'), collections])

  if (!providers || !filteredCollections || !productTypes) {
    return null
  }

  return (
    <Grid
      container
      spacing={6}
      py={4}
      boxSizing="border-box"
    >
      <Grid item xs={6}>
        <TextFieldCustom
          name="name"
          control={control}
          label="Название"
          errorMessage={errors.name?.message}
        />
      </Grid>
      <Grid item xs={6}>
        <TextFieldCustom
          name="base_price"
          control={control}
          label="Цена"
          errorMessage={errors.base_price?.message}
          required
          typeNumber
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" mb={2}>Описание</Typography>
        <EditorWrapper>
          <ReactDraftWysiwyg
            editorState={descriptionState}
            onEditorStateChange={data => setDescriptionState(data)}
          />
          <Controller
            name="description"
            control={control}
            render={({field}: any) => (
              <input
                type="hidden"
                {...field}
              />
            )}
          />
        </EditorWrapper>
      </Grid>
      <Grid item xs={6}>
        <ModalFormControl errorMessage={errors.provider_id?.message}>
          <InputLabel id="select-provider">Поставщик *</InputLabel>
          <Controller
            name="provider_id"
            control={control}
            render={({field}) => (
              <Select
                labelId="select-provider-label"
                id="select-provider"
                label="Поставщик *"
                {...field}
                required
                onChange={(event) => {
                  if (field.onChange) {
                    field.onChange(event)
                  }
                  setValue('category_id', [])
                  setValue('subcategory_id', [])
                  setValue('collection_id', [])
                }}
              >
                {providers.data.map(({id, name}) => (
                  <MenuItem key={id} value={id}>{name}</MenuItem>
                ))}
              </Select>
            )}
          />
        </ModalFormControl>
      </Grid>
      <Grid item xs={6}>
        <ModalFormControl errorMessage={errors.category_id?.message}>
          <InputLabel id="select-category">
            Категория * &nbsp;
            {categories.length < 1 ? '( Пусто )' : `( ${categories.length} )`}
          </InputLabel>
          <Controller
            name="category_id"
            control={control}
            render={({field}) => (
              <Select
                labelId="select-category-label"
                id="select-category"
                label={`Категория * ${categories.length < 1 ? '( Пусто )' : `( ${categories.length} )`}`}
                required
                {...field}
                disabled={categories.length < 1}
                multiple
                onChange={(event) => {
                  if (field.onChange) {
                    field.onChange(event)
                  }
                  if (event.target.value?.length) {
                    const selected: number | undefined = Number(event.target.value[event.target.value.length - 1])
                    if (selected) {
                      setValue('category_id', [selected])
                    }
                  }
                  setValue('subcategory_id', [])
                  setValue('collection_id', [])
                  setOpenCategory(false)
                }}
                open={openCategory}
                onOpen={() => setOpenCategory(true)}
                onClose={() => setOpenCategory(false)}
              >
                {categories.map(({id, name}) => (
                  <MenuItem key={id} value={id}>{name}</MenuItem>
                ))}
              </Select>
            )}
          />
        </ModalFormControl>
      </Grid>
      <Grid item xs={6}>
        <ModalFormControl errorMessage={errors.subcategory_id?.message}>
          <InputLabel id="select-subcategory">
            Подкатегория&nbsp;
            {subcategories.length < 1 ? '( Пусто )' : `( ${subcategories.length} )`}
          </InputLabel>
          <Controller
            name="subcategory_id"
            control={control}
            render={({field}) => (
              <Select
                labelId="select-subcategory-label"
                id="select-subcategory"
                label={`Подкатегория ${subcategories.length < 1 ? '(Пусто)' : `( ${subcategories.length} )`}`}
                {...field}
                required
                multiple
                disabled={subcategories.length < 1}
                onChange={(event) => {
                  if (field.onChange) {
                    field.onChange(event)
                  }
                  if (event.target.value?.length) {
                    const selected: number | undefined = Number(event.target.value[event.target.value.length - 1])
                    if (selected) {
                      setValue('subcategory_id', [selected])
                    }
                  }
                  setValue('collection_id', [])
                  setOpenSubcategory(false)
                }}
                open={openSubcategory}
                onOpen={() => setOpenSubcategory(true)}
                onClose={() => setOpenSubcategory(false)}
              >
                {subcategories.map(({id, name}) => (
                  <MenuItem key={id} value={id}>{name}</MenuItem>
                ))}
              </Select>
            )}
          />
        </ModalFormControl>
      </Grid>
      <Grid item xs={6}>
        <ModalFormControl errorMessage={errors.collection_id?.message}>
          <InputLabel id="select-category">
            Коллекция&nbsp;
            {filteredCollections.length < 1 ? '( Пусто )' : `( ${filteredCollections.length} )`}
          </InputLabel>
          <Controller
            name="collection_id"
            control={control}
            render={({field}) => (
              <Select
                labelId="select-collection_id-label"
                id="select-collection_id"
                label={`Коллекция ${filteredCollections.length < 1 ? '(Пусто)' : `( ${filteredCollections.length} )`}`}
                {...field}
                required
                multiple
                disabled={filteredCollections.length < 1}
                onChange={(event) => {
                  if (field.onChange) {
                    field.onChange(event)
                  }
                  if (event.target.value?.length) {
                    const selected: number | undefined = Number(event.target.value[event.target.value.length - 1])
                    if (selected) {
                      setValue('collection_id', [selected])
                    }
                  }
                  setOpenCollection(false)
                }}
                open={openCollection}
                onOpen={() => setOpenCollection(true)}
                onClose={() => setOpenCollection(false)}
              >
                {filteredCollections.map(({id, name}) => (
                  <MenuItem key={id} value={id}>{name}</MenuItem>
                ))}
              </Select>
            )}
          />
        </ModalFormControl>
      </Grid>
      <Grid item xs={6}>
        <TextFieldCustom
          name="sku"
          control={control}
          label="Артикул"
          errorMessage={errors.sku?.message}
          required
        />
      </Grid>
      <Grid item xs={6}>
        <TextFieldCustom
          name="discount"
          control={control}
          label="Скидка %"
          errorMessage={errors.discount?.message}
          typeNumber
        />
      </Grid>
      <Grid item xs={6}>
        <TextFieldCustom
          name="quantity"
          control={control}
          label="Кол-во товаров"
          errorMessage={errors.quantity?.message}
          required
          typeNumber
        />
      </Grid>
      <Grid item xs={6}>
        <ModalFormControl errorMessage={errors.product_type_id?.message}>
          <InputLabel id="select-product-type">Тип товара</InputLabel>
          <Controller
            name="product_type_id"
            control={control}
            render={({field}) => (
              <Select
                labelId="select-product-type-label"
                id="select-product-type"
                label="Тип товара"
                {...field}
              >
                <MenuItem value={undefined}>Без типа</MenuItem>
                {productTypes.data.map(({id, name}) => (
                  <MenuItem key={id} value={id}>{name}</MenuItem>
                ))}
              </Select>
            )}
          />
        </ModalFormControl>
      </Grid>
      <Grid item xs={6}>
        <ModalFormControl errorMessage={errors.service_ids?.message}>
          <InputLabel id="select-service_ids">Недоступные услуги</InputLabel>
          <Controller
            name="service_ids"
            control={control}
            render={({field}) => (
              <Select
                labelId="select-service_ids-label"
                id="select-service_ids"
                label="Недоступные услуги"
                {...field}
                required={true}
                multiple
              >
                {services.map(({id, name}) => (
                  <MenuItem key={id} value={id}>{name}</MenuItem>
                ))}
              </Select>
            )}
          />
        </ModalFormControl>
      </Grid>
      <Grid item xs={6}>
        <TextFieldCustom
          name="unit"
          control={control}
          label="Ед. измерения"
          errorMessage={errors.unit?.message}
        />
      </Grid>
    </Grid>
  )
}

export { UpdateProductForm }
