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
import { useShippingTypeStore } from '@modules/shippingType/model/store'
import { ShippingTypeFormData, updateShippingTypeScheme } from '@modules/shippingType/model/ShippingTypeFormData'
import { ShippingTypeForm } from '@modules/shippingType/ui/ShippingTypeForm'

interface Props {
  mutate: KeyedMutator<any>
}

function UpdateShippingType({mutate}: Props) {
  const [images, setImages] = useState<File[]>([])
  const [shippingType, handleUpdateClose] = useShippingTypeStore(
    ({handleUpdateClose, update}) => [update, handleUpdateClose]
  )
  const {trigger, isMutating} = useSWRMutation(['/shipping-types', shippingType?.id], updateFetcher)
  const {
    control,
    formState: {errors},
    handleSubmit,
    setValue,
  } = useForm<ShippingTypeFormData>({
    defaultValues: {
      name: shippingType?.name,
      description: shippingType?.description,
      key: shippingType?.key,
      is_active: shippingType?.is_active,
      price: shippingType?.price,
    },
    mode: 'onBlur',
    resolver: yupResolver(updateShippingTypeScheme)
  })

  const onSubmit: SubmitHandler<ShippingTypeFormData> = async (data) => {
    try {
      const response = await trigger({
        ...data,
        is_active: data.is_active ? 1 : 0,
        icon: images[0]
      })
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

export { UpdateShippingType }
