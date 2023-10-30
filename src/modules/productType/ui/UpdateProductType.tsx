import { KeyedMutator } from 'swr'
import useSWRMutation from 'swr/mutation'
import { updateFetcher } from '@shared/api/fetcher/updateFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
import { useProductTypeStore } from '@modules/productType/model/store'
import { ProductTypeFormData, updateProductTypeScheme } from '@modules/productType/model/ProductTypeFormData'
import { ProductTypeForm } from '@modules/productType/ui/ProductTypeForm'

interface Props {
  mutate: KeyedMutator<any>
}

function UpdateProductType({mutate}: Props) {
  const [productType, handleUpdateClose] = useProductTypeStore(
    ({handleUpdateClose, update}) => [update, handleUpdateClose]
  )
  const {trigger, isMutating} = useSWRMutation(['/product-types', productType?.id], updateFetcher)
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<ProductTypeFormData>({
    defaultValues: {
      key: productType?.key,
      name: productType?.name,
    },
    mode: 'onBlur',
    resolver: yupResolver(updateProductTypeScheme)
  })

  const onSubmit: SubmitHandler<ProductTypeFormData> = async (data) => {
    try {
      const response = await trigger(data)
      await mutate()
      handleUpdateClose()
      toast.success(response.message)
    } catch (e) {
      const error = e as AxiosError<{ message: string }>
      toast.error(error.response?.data.message || 'Произошла ошибка')
    }
  }

  return (
    <CustomDialog
      title="Изменить"
      handleClose={handleUpdateClose}
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

export { UpdateProductType }
