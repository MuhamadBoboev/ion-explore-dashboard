import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import useSWRMutation from 'swr/mutation'
import { LoadingButton } from '@mui/lab'
import { KeyedMutator } from 'swr'
import { ServiceImageForm } from './ServiceImageForm'
import { AxiosError } from 'axios'
import { postFetcher } from '@shared/api/fetcher/postFetcher'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { useServiceImageStore } from '@modules/service/model/serviceImages/store'
import {
  createServiceImageScheme,
  ServiceImageFormData
} from '@modules/service/model/serviceImages/ServiceImageFormData'

interface Props {
  serviceId: number
  mutate: KeyedMutator<any>
}

function CreateServiceImage({serviceId, mutate}: Props) {
  const [images, setImages] = useState<File[]>([])
  const {trigger, isMutating} = useSWRMutation('/service-images', postFetcher)
  const [handleCreateClose] = useServiceImageStore(({handleCreateClose}) => [handleCreateClose])
  const {
    control,
    formState: {errors},
    handleSubmit,
    setError,
    setValue,
  } = useForm<ServiceImageFormData>({
    mode: 'onBlur',
    defaultValues: {
      service_id: serviceId,
    },
    resolver: yupResolver(createServiceImageScheme)
  })

  const onSubmit: SubmitHandler<ServiceImageFormData> = async (data) => {
    if (images.length === 0) {
      setError('image', {
        message: 'Пожалуйста выберите изображение'
      })
    }

    try {
      const response = await trigger({...data, service_id: serviceId, image: images[0]})
      await mutate()
      toast.success(response.message)
      handleCreateClose()
    } catch (e) {
      const error = e as AxiosError<{ message: string }>
      toast.error(error.response?.data?.message || 'Произошла ошибка')
    }
  }

  return (
    <CustomDialog
      title="Создать"
      handleClose={handleCreateClose}
    >
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <ServiceImageForm
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

export { CreateServiceImage }
