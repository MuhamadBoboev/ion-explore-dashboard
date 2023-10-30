import { useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { postFetcher } from '@shared/api/fetcher/postFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
import { usePaymentMethodStore } from '@modules/paymentMethod/model/store'
import { createPaymentMethodScheme, PaymentMethodFormData } from '@modules/paymentMethod/model/PaymentMethodFormData'
import { PaymentMethodForm } from '@modules/paymentMethod/ui/PaymentMethodForm'

function CreatePaymentMethod() {
  const [images, setImages] = useState<File[]>([])
  const {trigger, isMutating} = useSWRMutation('/payment-methods', postFetcher)
  const [handleCreateClose] = usePaymentMethodStore(({handleCreateClose}) => [handleCreateClose])
  const {
    control,
    formState: {errors},
    handleSubmit,
    setError,
    setValue,
  } = useForm<PaymentMethodFormData>({
    mode: 'onBlur',
    resolver: yupResolver(createPaymentMethodScheme)
  })

  const onSubmit: SubmitHandler<PaymentMethodFormData> = async (data) => {
    if (images.length === 0) {
      setError('icon', {
        message: 'Пожалуйста выберите иконку'
      })
    }
    try {
      const response = await trigger({...data, is_active: data.is_active ? 1 : 0, icon: images[0]})
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

export { CreatePaymentMethod }
