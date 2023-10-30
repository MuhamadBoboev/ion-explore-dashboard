import { KeyedMutator } from 'swr'
import useSWRMutation from 'swr/mutation'
import { updateFetcher } from '@shared/api/fetcher/updateFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
import { useShippingLocationStore } from '@modules/shippingLocation/model/store'
import {
  ShippingLocationFormData,
  updateShippingLocationScheme
} from '@modules/shippingLocation/model/ShippingLocationFormData'
import { ShippingLocationForm } from '@modules/shippingLocation/ui/ShippingLocationForm'

interface Props {
  mutate: KeyedMutator<any>
}

function UpdateShippingLocation({mutate}: Props) {
  const [shippingLocation, handleUpdateClose] = useShippingLocationStore(
    ({handleUpdateClose, update}) => [update, handleUpdateClose]
  )
  const {trigger, isMutating} = useSWRMutation(['/shipping-locations', shippingLocation?.id], updateFetcher)
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<ShippingLocationFormData>({
    defaultValues: {
      name: shippingLocation?.name,
      is_active: shippingLocation?.is_active,
      price: shippingLocation?.price,
      order: shippingLocation?.order,
    },
    mode: 'onBlur',
    resolver: yupResolver(updateShippingLocationScheme)
  })

  const onSubmit: SubmitHandler<ShippingLocationFormData> = async (data) => {
    try {
      const response = await trigger({...data, is_active: data.is_active ? 1 : 0})
      handleUpdateClose()
      await mutate()
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
        <ShippingLocationForm
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

export { UpdateShippingLocation }
