import { useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { postFetcher } from '@shared/api/fetcher/postFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
import { useServiceStore } from '@modules/service/model/services/store'
import { createServiceScheme, ServiceFormData } from '@modules/service/model/services/ServiceFormData'
import { ServiceForm } from '@modules/service/ui/services/ServiceForm'
import { KeyedMutator } from 'swr'

interface Props {
  mutate: KeyedMutator<any>
}

function CreateService({mutate}: Props) {
  const [images, setImages] = useState<File[]>([])
  const {trigger, isMutating} = useSWRMutation('/services', postFetcher)
  const [handleCreateClose] = useServiceStore(({handleCreateClose}) => [handleCreateClose])
  const {
    control,
    formState: {errors},
    handleSubmit,
    setValue,
  } = useForm<ServiceFormData>({
    mode: 'onBlur',
    resolver: yupResolver(createServiceScheme)
  })

  const onSubmit: SubmitHandler<ServiceFormData> = async (data) => {
    try {
      const response = await trigger({...data, image: images[0]})
      await mutate()
      handleCreateClose()
      toast.success(response.message)
    } catch (e) {
      const error = e as AxiosError<{ message: string }>
      toast.error(error.response?.data.message || 'Произошла ошибка')
    }
  }

  return (
    <CustomDialog
      title="Добавить"
      handleClose={handleCreateClose}
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

export { CreateService }
