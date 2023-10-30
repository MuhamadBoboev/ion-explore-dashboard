import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import useSWRMutation from 'swr/mutation'
import { LoadingButton } from '@mui/lab'
import { KeyedMutator } from 'swr'
import { ProductImageForm } from './ProductImageForm'
import { AxiosError } from 'axios'
import { postFetcher } from '@shared/api/fetcher/postFetcher'
import { useProductImageStore } from '@modules/product/model/images/store'
import { createProductImageScheme, ProductImageFormData } from '@modules/product/model/images/ProductImageFormData'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'

interface Props {
  productId: number
  mutate: KeyedMutator<any>
}

function CreateProductImage({productId, mutate}: Props) {
  const [images, setImages] = useState<File[]>([])
  const {trigger, isMutating} = useSWRMutation('/product-image', postFetcher)
  const [handleCreateClose] = useProductImageStore(({handleCreateClose}) => [handleCreateClose])
  const {
    control,
    formState: {errors},
    handleSubmit,
    setError,
    setValue,
  } = useForm<ProductImageFormData>({
    mode: 'onBlur',
    defaultValues: {
      product_id: productId,
    },
    resolver: yupResolver(createProductImageScheme)
  })

  const onSubmit: SubmitHandler<ProductImageFormData> = async (data) => {
    if (images.length === 0) {
      setError('image', {
        message: 'Пожалуйста выберите изображение'
      })
    }

    try {
      const response = await trigger({...data, image: images[0]})
      await mutate()
      toast.success(response.message)
      handleCreateClose()
    } catch (e) {
      const error = e as AxiosError<{message: string}>
      toast.error(error.response?.data?.message || 'Произошла ошибка')
    }
  }

  return (
    <CustomDialog
      title="Создать"
      handleClose={handleCreateClose}
    >
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <ProductImageForm
          errors={errors}
          control={control}
          images={images}
          setImages={setImages}
          setValue={setValue}
        />
        <LoadingButton
          loading={isMutating}
          fullWidth
          type="submit"
          size="large"
          variant="contained"
          sx={{mt: 5}}
        >
          Отправить
        </LoadingButton>
      </form>
    </CustomDialog>
  )
}

export { CreateProductImage }
