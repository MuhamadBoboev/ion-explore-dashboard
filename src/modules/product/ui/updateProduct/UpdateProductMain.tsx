import { useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { updateFetcher } from '@shared/api/fetcher/updateFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { UpdateProductFormData, updateProductScheme } from '@modules/product/model/updateProduct/UpdateProductFormData'
import ImageContainer from '@shared/ui/ImageContainer'
import { IProduct } from '@modules/product'
import { LoadingButton } from '@mui/lab'
import toast from 'react-hot-toast'
import { KeyedMutator } from 'swr'
import { AxiosError } from 'axios'
import { UpdateProductForm } from '@modules/product/ui/updateProduct/UpdateProductForm'
import { yupResolver } from '@hookform/resolvers/yup'
import { setProductDefaultValues } from '@modules/product/lib/setProductDefaultValues'

interface Props {
  product: IProduct
  mutate: KeyedMutator<any>
}

function UpdateProductMain({product, mutate}: Props) {
  const [image, setImage] = useState<File | null>(null)
  const {trigger, isMutating, reset} = useSWRMutation(['/products', product.id], updateFetcher)
  const {
    control,
    formState: {errors},
    handleSubmit,
    setValue,
    getValues,
    watch,
  } = useForm<UpdateProductFormData>({
    mode: 'onBlur',
    defaultValues: setProductDefaultValues(product),
    resolver: yupResolver(updateProductScheme)
  })

  const onSubmit: SubmitHandler<UpdateProductFormData> = async (data) => {
    try {
      const formData: any = {
        ...data,
        image,
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
      const {message} = await trigger(formData)
      toast.success(message)
      await mutate()
      reset()
      setImage(null)
    } catch (e) {
      const {response} = e as AxiosError<{ message: string }>
      toast.error(response?.data?.message || 'Произошла ошибка')
    }
  }

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <ImageContainer
        urlImage={product.image}
        image={image}
        setImage={setImage}
        control={control}
        errorMessage={errors.image?.message}
      />
      <UpdateProductForm
        errors={errors}
        control={control}
        description={product.description}
        setValue={setValue}
        getValues={getValues}
        watch={watch}
      />
      <LoadingButton
        loading={isMutating}
        disabled={isMutating}
        fullWidth
        type="submit"
        size="large"
        variant="contained"
        sx={{mt: 5}}
      >
        Отправить
      </LoadingButton>
    </form>
  )
}

export { UpdateProductMain }
