import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { KeyedMutator } from 'swr'
import useSWRMutation from 'swr/mutation'
import { ProjectImageForm } from './ProjectImageForm'
import { LoadingButton } from '@mui/lab'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { updateFetcher } from '@shared/api/fetcher/updateFetcher'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { useProjectImageStore } from '@modules/project/model/projectImages/store'
import {
  ProjectImageFormData,
  updateProjectImageScheme
} from '@modules/project/model/projectImages/ProjectImageFormData'

interface Props {
  mutate: KeyedMutator<any>
}

function UpdateProjectImage({mutate}: Props) {
  const [images, setImages] = useState<File[]>([])
  const [projectImage, handleUpdateClose] = useProjectImageStore(
    ({handleUpdateClose, update}) => [update, handleUpdateClose]
  )
  const {trigger, isMutating} = useSWRMutation(['/project-images', projectImage?.id], updateFetcher)
  const {
    control,
    formState: {errors},
    handleSubmit,
    setValue,
  } = useForm<ProjectImageFormData>({
    mode: 'onBlur',
    defaultValues: {
      title: projectImage?.title,
    },
    resolver: yupResolver(updateProjectImageScheme)
  })

  const onSubmit: SubmitHandler<ProjectImageFormData> = async (data) => {
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
        <ProjectImageForm
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

export { UpdateProjectImage }
