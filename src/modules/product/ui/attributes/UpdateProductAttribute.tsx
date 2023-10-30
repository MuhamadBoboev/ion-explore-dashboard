import { KeyedMutator } from 'swr'
import useSWRMutation from 'swr/mutation'
import { updateFetcher } from '@shared/api/fetcher/updateFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
import { useProductAttributeStore } from '@modules/product/model/attributes/store'
import {
  ProductAttributeFormData,
  updateProductAttributeScheme
} from '@modules/product/model/attributes/ProductAttributeFormData'
import { ProductAttributeForm } from '@modules/product/ui/attributes/ProductAttributeForm'
import { IAttribute } from '@modules/attribute'

interface Props {
  attributes: IAttribute[]
  mutate: KeyedMutator<any>
}

function UpdateProductAttribute({attributes, mutate}: Props) {
  const [productAttribute, handleUpdateClose] = useProductAttributeStore(
    ({handleUpdateClose, update}) => [update, handleUpdateClose]
  )
  const {trigger, isMutating} = useSWRMutation(['/product-attribute', productAttribute?.id], updateFetcher)
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<ProductAttributeFormData>({
    defaultValues: {
      product_id: productAttribute?.product_id,
      attribute_id: productAttribute?.attribute.id,
      value: productAttribute?.value,
      sku: productAttribute?.sku,
      price: productAttribute?.price,
      quantity: productAttribute?.quantity,
    },
    mode: 'onBlur',
    resolver: yupResolver(updateProductAttributeScheme)
  })

  const onSubmit: SubmitHandler<ProductAttributeFormData> = async (data) => {
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

export { UpdateProductAttribute }
