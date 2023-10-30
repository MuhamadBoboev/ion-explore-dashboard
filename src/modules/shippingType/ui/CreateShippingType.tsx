import { useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { postFetcher } from '@shared/api/fetcher/postFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
import { useShippingTypeStore } from '@modules/shippingType/model/store'
import { createShippingTypeScheme, ShippingTypeFormData } from '@modules/shippingType/model/ShippingTypeFormData'
import { ShippingTypeForm } from '@modules/shippingType/ui/ShippingTypeForm'

function CreateShippingType() {
  const [images, setImages] = useState<File[]>([])
  const {trigger, isMutating} = useSWRMutation('/shipping-types', postFetcher)
  const [handleCreateClose] = useShippingTypeStore(({handleCreateClose}) => [handleCreateClose])
  const {
    control,
    formState: {errors},
    handleSubmit,
    setError,
    setValue,
  } = useForm<ShippingTypeFormData>({
    mode: 'onBlur',
    resolver: yupResolver(createShippingTypeScheme)
  })

  const onSubmit: SubmitHandler<ShippingTypeFormData> = async (data) => {
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
        <ShippingTypeForm
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

export { CreateShippingType }
