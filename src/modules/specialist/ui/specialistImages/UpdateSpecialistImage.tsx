import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { KeyedMutator } from 'swr'
import useSWRMutation from 'swr/mutation'
import { SpecialistImageForm } from './SpecialistImageForm'
import { LoadingButton } from '@mui/lab'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { updateFetcher } from '@shared/api/fetcher/updateFetcher'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { useSpecialistImageStore } from '@modules/specialist/model/specialistsImage/store'
import {
  SpecialistImageFormData,
  updateSpecialistImageScheme
} from '@modules/specialist/model/specialistsImage/SpecialistImageFormData'

interface Props {
  mutate: KeyedMutator<any>
}

function UpdateSpecialistImage({mutate}: Props) {
  const [images, setImages] = useState<File[]>([])
  const [specialistImage, handleUpdateClose] = useSpecialistImageStore(
    ({handleUpdateClose, update}) => [update, handleUpdateClose]
  )
  const {trigger, isMutating} = useSWRMutation(['/specialist-images', specialistImage?.id], updateFetcher)
  const {
    control,
    formState: {errors},
    handleSubmit,
    setValue,
  } = useForm<SpecialistImageFormData>({
    mode: 'onBlur',
    defaultValues: {
      title: specialistImage?.title,
    },
    resolver: yupResolver(updateSpecialistImageScheme)
  })

  const onSubmit: SubmitHandler<SpecialistImageFormData> = async (data) => {
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

export { UpdateSpecialistImage }
