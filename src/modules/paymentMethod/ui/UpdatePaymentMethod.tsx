import { KeyedMutator } from 'swr'
import { useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { updateFetcher } from '@shared/api/fetcher/updateFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
import { usePaymentMethodStore } from '@modules/paymentMethod/model/store'
import { PaymentMethodFormData, updatePaymentMethodScheme } from '@modules/paymentMethod/model/PaymentMethodFormData'
import { PaymentMethodForm } from '@modules/paymentMethod/ui/PaymentMethodForm'

interface Props {
  mutate: KeyedMutator<any>
}

function UpdatePaymentMethod({mutate}: Props) {
  const [images, setImages] = useState<File[]>([])
  const [paymentMethod, handleUpdateClose] = usePaymentMethodStore(
    ({handleUpdateClose, update}) => [update, handleUpdateClose]
  )
  const {trigger, isMutating} = useSWRMutation(['/payment-methods', paymentMethod?.id], updateFetcher)
  const {
    control,
    formState: {errors},
    handleSubmit,
    setValue,
  } = useForm<PaymentMethodFormData>({
    defaultValues: {
      name: paymentMethod?.name,
      description: paymentMethod?.description,
      key: paymentMethod?.key,
      is_active: !!paymentMethod?.is_active,
    },
    mode: 'onBlur',
    resolver: yupResolver(updatePaymentMethodScheme)
  })

  const onSubmit: SubmitHandler<PaymentMethodFormData> = async (data) => {
    try {
      const response = await trigger({...data, is_active: data.is_active ? 1 : 0, icon: images[0]})
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
        <PaymentMethodForm
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

export { UpdatePaymentMethod }
