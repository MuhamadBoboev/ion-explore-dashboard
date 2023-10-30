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
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import { useServiceStore } from '@modules/service/model/services/store'
import { ServiceFormData, updateServiceScheme } from '@modules/service/model/services/ServiceFormData'
import { ServiceForm } from '@modules/service/ui/services/ServiceForm'

interface Props {
  mutate: KeyedMutator<any>
}

function UpdateService({mutate}: Props) {
  const [images, setImages] = useState<File[]>([])
  const [service, handleUpdateClose] = useServiceStore(
    ({handleUpdateClose, update, handleUpdateOpen}) => [update, handleUpdateClose, handleUpdateOpen]
  )
  const {trigger, isMutating} = useSWRMutation(['/services', service?.id], updateFetcher)
  const {
    control,
    formState: {errors},
    handleSubmit,
    setValue,
  } = useForm<ServiceFormData>({
    defaultValues: {
      name: service?.name,
      description: service?.description,
      sku: service?.sku,
      price: service?.price,
      unit: service?.unit,
    },
    mode: 'onBlur',
    resolver: yupResolver(updateServiceScheme)
  })

  const onSubmit: SubmitHandler<ServiceFormData> = async (data) => {
    try {
      const response = await trigger({...data, image: images[0]})
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
        <ServiceForm
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

export { UpdateService }
