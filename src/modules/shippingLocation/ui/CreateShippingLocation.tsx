import useSWRMutation from 'swr/mutation'
import { postFetcher } from '@shared/api/fetcher/postFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
import { useShippingLocationStore } from '@modules/shippingLocation/model/store'
import {
  createShippingLocationScheme,
  ShippingLocationFormData
} from '@modules/shippingLocation/model/ShippingLocationFormData'
import { ShippingLocationForm } from '@modules/shippingLocation/ui/ShippingLocationForm'

function CreateShippingLocation() {
  const {trigger, isMutating} = useSWRMutation('/shipping-locations', postFetcher)
  const [handleCreateClose] = useShippingLocationStore(({handleCreateClose}) => [handleCreateClose])
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<ShippingLocationFormData>({
    mode: 'onBlur',
    resolver: yupResolver(createShippingLocationScheme)
  })

  const onSubmit: SubmitHandler<ShippingLocationFormData> = async (data) => {
    try {
      const response = await trigger({...data, is_active: data.is_active ? 1 : 0})
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

export { CreateShippingLocation }
