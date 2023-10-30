import CustomCard from '@shared/ui/CustomCard'
import Typography from '@mui/material/Typography'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { CreateProductFormData, createProductScheme } from '@modules/product/model/createProduct/CreateProductFormData'
import { yupResolver } from '@hookform/resolvers/yup'
import Grid from '@mui/material/Grid'
import { FileUploader } from '@shared/ui/FileUploader'
import { useEffect, useMemo, useState } from 'react'
import TextFieldCustom from '@shared/ui/TextFieldCustom'
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'
import { EditorState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorWrapper } from '../../../../@core/styles/libs/react-draft-wysiwyg'
import { stateToHTML } from 'draft-js-export-html'
import useSWR from 'swr'
import { IProvider } from '@modules/provider'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import InputLabel from '@mui/material/InputLabel'
import { Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import ModalFormControl from '@shared/ui/ModalFormControl'
import { ICategory, ISubcategory } from '@modules/catalog'
import { LoadingButton } from '@mui/lab'
import useSWRMutation from 'swr/mutation'
import { postFetcher } from '@shared/api/fetcher/postFetcher'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { ICollection } from '@modules/collection'
import { IProductType } from '@modules/productType'
import { IService } from '@modules/service'

function CreateProduct() {
  const [image, setImage] = useState<File[]>([])
  const [description, setDescription] = useState(EditorState.createEmpty())
  const [categories, setCategories] = useState<ICategory[]>([])
  const [subcategories, setSubcategories] = useState<ISubcategory[]>([])
  const [openCategory, setOpenCategory] = useState(false)
  const [openSubcategory, setOpenSubcategory] = useState(false)
  const [openCollection, setOpenCollection] = useState(false)
  const [services, setServices] = useState<IService[]>([])
  const { data: providers } = useSWR<{ data: IProvider[] }>('/providers', getFetcher)
  const { data: collections } = useSWR<{ data: ICollection[] }>('/collections', getFetcher)
  const { data: productTypes } = useSWR<{ data: IProductType[] }>('/product-types', getFetcher)
  const { trigger, isMutating } = useSWRMutation('/products', postFetcher)

  const {
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    watch,
    getValues,
    setError,
    reset,
  } = useForm<CreateProductFormData>({
    mode: 'onBlur',
    defaultValues: {
      category_id: [],
      subcategory_id: [],
      collection_id: [],
      service_ids: [],
    },
    resolver: yupResolver(createProductScheme)
  })
  const router = useRouter()

  useEffect(() => {
    setValue('description', stateToHTML(description.getCurrentContent()))
  }, [description])

  useEffect(() => {
    if (providers) {
      const provider = providers.data.find(({ id }) => getValues('provider_id') === id)
      if (provider) {
        setCategories(provider?.categories || [])
      }
      setValue('collection_id', [])
      setSubcategories([])
    }
  }, [watch('provider_id')])

  useEffect(() => {
    if (providers) {
      const categoryId = getValues('category_id')
      if (categoryId && categoryId[0]) {
        const selectedCategoryId = categoryId[0]
        if (selectedCategoryId) {
          const providerId = getValues('provider_id')
          const provider = providers?.data.find(({ id }) => id === providerId)!
          setSubcategories(provider.subcategories.filter(
            (subcategory) => subcategory.category_id === selectedCategoryId
          ))
          setValue('collection_id', [])
        }
      }
    }
  }, [watch('category_id')])

  useEffect(() => {
    setValue('collection_id', [])
  }, [watch('subcategory_id')])

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

  const onSubmit: SubmitHandler<CreateProductFormData> = async (data) => {
    const categoryId = getValues('category_id')
    if (categoryId?.length === 0 && getValues('collection_id') === undefined) {
      setError('category_id', {
        message: 'Выберите категорию или коллекцию'
      })
      return
    }
    try {
      const formData: any = {
        ...data,
        image: image[0],
      }
      if (data.category_id && data.category_id[0]) {
        formData.category_id = formData.category_id[0]
      }
      if (data.subcategory_id && data.subcategory_id[0]) {
        formData.subcategory_id = formData.subcategory_id[0]
      }
      if (data.collection_id && data.collection_id[0]) {
        formData.collection_id = formData.collection_id[0]
      }
      const response = await trigger(formData)
      toast.success(response.message)
      reset({
        name: '',
        unit: '',
        provider_id: undefined,
        category_id: [],
        subcategory_id: [],
        collection_id: [],
        service_ids: [],
        base_price: undefined,
        discount: undefined,
        image: '',
        description: '',
        product_type_id: undefined,
        sku: '',
        quantity: undefined,
      })
      router.push(`/main/products/${response.product.slug}`)
    } catch (e) {
      const error = e as AxiosError<{ message: string }>
      toast.error(error.response?.data.message || 'Произошла ошибка')
    }
  }

  const filteredCollections = useMemo(() => {
    return collections
      ?.data
      .filter(({ provider }) => getValues('provider_id') === provider.id)
      .filter(({ category }) => {
        const categoryId = getValues('category_id')
        if (!categoryId || !categoryId[0]) {
          return false
        }
        return category.id === categoryId[0]
      })
      .filter(({ subcategory }) => {
        const subcategoryId = getValues('subcategory_id')
        if (!subcategoryId || !subcategoryId[0]) {
          return true
        }
        return subcategory?.id === subcategoryId[0]
      }) || []
  }, [watch('provider_id'), watch('category_id'), watch('subcategory_id')])

  if (!providers || !filteredCollections || !productTypes) {
    return null
  }

  return (
    <CustomCard>
      <Typography
        variant="h5"
        component="h1"
        mt={8}
        ml={8}
      >
        Добавить товар
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={5}
          p={8}
          boxSizing="border-box"
        >
          <Grid item xs={6}>
            <TextFieldCustom
              name="name"
              control={control}
              label="Название"
              errorMessage={errors.name?.message}
              required
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
                editorState={description}
                onEditorStateChange={data => setDescription(data)}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }: any) => (
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
                render={({ field }) => (
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
                    }}
                  >
                    {providers.data.map(({ id, name }) => (
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
                render={({ field }) => (
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
                      setOpenCategory(false)
                    }}
                    open={openCategory}
                    onOpen={() => setOpenCategory(true)}
                    onClose={() => setOpenCategory(false)}
                  >
                    {categories.map(({ id, name }) => (
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
                render={({ field }) => (
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
                      setOpenSubcategory(false)
                    }}
                    open={openSubcategory}
                    onOpen={() => setOpenSubcategory(true)}
                    onClose={() => setOpenSubcategory(false)}
                  >
                    {subcategories.map(({ id, name }) => (
                      <MenuItem key={id} value={id}>{name}</MenuItem>
                    ))}
                  </Select>
                )}
              />
            </ModalFormControl>
          </Grid>
          <Grid item xs={6}>
            <ModalFormControl errorMessage={errors.collection_id?.message}>
              <InputLabel id="select-collection_id">
                Коллекция&nbsp;
                {filteredCollections.length < 1 ? '( Пусто )' : `( ${filteredCollections.length} )`}
              </InputLabel>
              <Controller
                name="collection_id"
                control={control}
                render={({ field }) => (
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
                    {filteredCollections.map(({ id, name }) => (
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
                render={({ field }) => (
                  <Select
                    labelId="select-product-type-label"
                    id="select-product-type"
                    label="Тип товара"
                    {...field}
                  >
                    <MenuItem value={undefined}>Без типа</MenuItem>
                    {productTypes.data.map(({ id, name }) => (
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
                render={({ field }) => (
                  <Select
                    labelId="select-service_ids-label"
                    id="select-service_ids"
                    label="Недоступные услуги"
                    {...field}
                    required={true}
                    multiple
                  >
                    {services.map(({ id, name }) => (
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
          <Grid item xs={12}>
            <FileUploader
              name="image"
              control={control}
              setValue={setValue}
              files={image}
              setFiles={setImage}
              errorMessage={errors.image?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              loading={isMutating}
              disabled={isMutating}
            >
              Отправить
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </CustomCard>
  )
}

export { CreateProduct }
