import useSWRMutation from 'swr/mutation'
import { postFetcher } from '@shared/api/fetcher/postFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
import { useProductTypeStore } from '@modules/productType/model/store'
import { createProductTypeScheme, ProductTypeFormData } from '@modules/productType/model/ProductTypeFormData'
import { ProductTypeForm } from '@modules/productType/ui/ProductTypeForm'

function CreateProductType() {
  const {trigger, isMutating} = useSWRMutation('/product-types', postFetcher)
  const [handleCreateClose] = useProductTypeStore(({handleCreateClose}) => [handleCreateClose])
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<ProductTypeFormData>({
    mode: 'onBlur',
    resolver: yupResolver(createProductTypeScheme)
  })

  const onSubmit: SubmitHandler<ProductTypeFormData> = async (data) => {
    try {
      const response = await trigger(data)
      handleCreateClose()
      toast.success(response.message)
    } catch (e) {
      const error = e as AxiosError<{ message: string }>
      toast.error(error.response?.data.message || 'Произошла ошибка')
    }
  }

  return (
    <CustomDialog
      title="Создать"
      handleClose={handleCreateClose}
    >
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <ProductTypeForm
          errors={errors}
          control={control}
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

export { CreateProductType }
