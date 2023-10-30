import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { KeyedMutator } from 'swr'
import useSWRMutation from 'swr/mutation'
import { ProductImageForm } from './ProductImageForm'
import { LoadingButton } from '@mui/lab'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { useProductImageStore } from '@modules/product/model/images/store'
import { updateFetcher } from '@shared/api/fetcher/updateFetcher'
import { ProductImageFormData, updateProductImageScheme } from '@modules/product/model/images/ProductImageFormData'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'

interface Props {
  mutate: KeyedMutator<any>
}

function UpdateProductImage({mutate}: Props) {
  const [images, setImages] = useState<File[]>([])
  const [productImage, handleUpdateClose] = useProductImageStore(
    ({handleUpdateClose, update}) => [update, handleUpdateClose]
  )
  const {trigger, isMutating} = useSWRMutation(['/product-image', productImage?.id], updateFetcher)
  const {
    control,
    formState: {errors},
    handleSubmit,
    setValue,
  } = useForm<ProductImageFormData>({
    defaultValues: {
      title: productImage?.title || '',
      product_id: productImage?.product_id,
    },
    mode: 'onBlur',
    resolver: yupResolver(updateProductImageScheme)
  })

  const onSubmit: SubmitHandler<ProductImageFormData> = async (data) => {
    try {
      const response = await trigger({...data, image: images[0]})
      await mutate()
      handleUpdateClose()
      toast.success(response.message)
    } catch (e) {
      const error = e as AxiosError<{message: string}>
      toast.error(error.response?.data?.message || 'Произошла ошибка')
    }
  }

  return (
    <CustomDialog
      title="Изменить"
      handleClose={handleUpdateClose}
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

export { UpdateProductImage }
