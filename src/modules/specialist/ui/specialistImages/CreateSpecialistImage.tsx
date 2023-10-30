import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import useSWRMutation from 'swr/mutation'
import { LoadingButton } from '@mui/lab'
import { KeyedMutator } from 'swr'
import { SpecialistImageForm } from './SpecialistImageForm'
import { AxiosError } from 'axios'
import { postFetcher } from '@shared/api/fetcher/postFetcher'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { useSpecialistImageStore } from '@modules/specialist/model/specialistsImage/store'
import {
  createSpecialistImageScheme,
  SpecialistImageFormData
} from '@modules/specialist/model/specialistsImage/SpecialistImageFormData'

interface Props {
  specialistId: number
  mutate: KeyedMutator<any>
}

function CreateSpecialistImage({specialistId, mutate}: Props) {
  const [images, setImages] = useState<File[]>([])
  const {trigger, isMutating} = useSWRMutation('/specialist-images', postFetcher)
  const [handleCreateClose] = useSpecialistImageStore(({handleCreateClose}) => [handleCreateClose])
  const {
    control,
    formState: {errors},
    handleSubmit,
    setError,
    setValue,
  } = useForm<SpecialistImageFormData>({
    mode: 'onBlur',
    defaultValues: {
      specialist_id: specialistId,
    },
    resolver: yupResolver(createSpecialistImageScheme)
  })

  const onSubmit: SubmitHandler<SpecialistImageFormData> = async (data) => {
    if (images.length === 0) {
      setError('image', {
        message: 'Пожалуйста выберите изображение'
      })
    }

    try {
      const response = await trigger({
        ...data,
        specialist_id: specialistId,
        image: images[0]
      })
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
        <SpecialistImageForm
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

export { CreateSpecialistImage }
