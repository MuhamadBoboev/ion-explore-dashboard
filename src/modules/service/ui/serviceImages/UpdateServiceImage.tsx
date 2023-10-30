import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { KeyedMutator } from 'swr'
import useSWRMutation from 'swr/mutation'
import { ServiceImageForm } from './ServiceImageForm'
import { LoadingButton } from '@mui/lab'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { updateFetcher } from '@shared/api/fetcher/updateFetcher'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { useServiceImageStore } from '@modules/service/model/serviceImages/store'
import {
  ServiceImageFormData,
  updateServiceImageScheme
} from '@modules/service/model/serviceImages/ServiceImageFormData'

interface Props {
  mutate: KeyedMutator<any>
}

function UpdateServiceImage({mutate}: Props) {
  const [images, setImages] = useState<File[]>([])
  const [serviceImage, handleUpdateClose] = useServiceImageStore(
    ({handleUpdateClose, update}) => [update, handleUpdateClose]
  )
  const {trigger, isMutating} = useSWRMutation(['/service-images', serviceImage?.id], updateFetcher)
  const {
    control,
    formState: {errors},
    handleSubmit,
    setValue,
  } = useForm<ServiceImageFormData>({
    mode: 'onBlur',
    defaultValues: {
      title: serviceImage?.title,
    },
    resolver: yupResolver(updateServiceImageScheme)
  })

  const onSubmit: SubmitHandler<ServiceImageFormData> = async (data) => {
    try {
      const response = await trigger({...data, image: images[0]})
      await mutate()
      handleUpdateClose()
      toast.success(response.message)
    } catch (e) {
      const error = e as AxiosError<{ message: string }>
      toast.error(error.response?.data?.message || 'Произошла ошибка')
    }
  }

  return (
    <CustomDialog
      title="Изменить"
      handleClose={handleUpdateClose}
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

export { UpdateServiceImage }
