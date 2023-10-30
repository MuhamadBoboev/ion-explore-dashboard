import useSWRMutation from 'swr/mutation'
import { postFetcher } from '@shared/api/fetcher/postFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
import { useProductAttributeStore } from '@modules/product/model/attributes/store'
import {
  createProductAttributeScheme,
  ProductAttributeFormData
} from '@modules/product/model/attributes/ProductAttributeFormData'
import { ProductAttributeForm } from '@modules/product/ui/attributes/ProductAttributeForm'
import { IAttribute } from '@modules/attribute'
import { KeyedMutator } from 'swr'

interface Props {
  attributes: IAttribute[]
  productId: number
  mutate: KeyedMutator<any>
}

function CreateProductAttribute({productId, attributes, mutate}: Props) {
  const {trigger, isMutating} = useSWRMutation('/product-attribute', postFetcher)
  const [handleCreateClose] = useProductAttributeStore(({handleCreateClose}) => [handleCreateClose])
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<ProductAttributeFormData>({
    mode: 'onBlur',
    defaultValues: {
      product_id: productId,
    },
    resolver: yupResolver(createProductAttributeScheme)
  })

  const onSubmit: SubmitHandler<ProductAttributeFormData> = async (data) => {
    try {
      const response = await trigger(data)
      await mutate()
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
        <ProductAttributeForm
          errors={errors}
          control={control}
          attributes={attributes}
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

export { CreateProductAttribute }
