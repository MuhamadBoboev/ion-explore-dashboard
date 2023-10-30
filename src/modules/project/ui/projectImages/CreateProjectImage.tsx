import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import useSWRMutation from 'swr/mutation'
import { LoadingButton } from '@mui/lab'
import { KeyedMutator } from 'swr'
import { ProjectImageForm } from './ProjectImageForm'
import { AxiosError } from 'axios'
import { postFetcher } from '@shared/api/fetcher/postFetcher'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { useProjectImageStore } from '@modules/project/model/projectImages/store'
import {
  createProjectImageScheme,
  ProjectImageFormData
} from '@modules/project/model/projectImages/ProjectImageFormData'

interface Props {
  projectId: number
  mutate: KeyedMutator<any>
}

function CreateProjectImage({projectId, mutate}: Props) {
  const [images, setImages] = useState<File[]>([])
  const {trigger, isMutating} = useSWRMutation('/project-images', postFetcher)
  const [handleCreateClose] = useProjectImageStore(({handleCreateClose}) => [handleCreateClose])
  const {
    control,
    formState: {errors},
    handleSubmit,
    setError,
    setValue,
  } = useForm<ProjectImageFormData>({
    mode: 'onBlur',
    defaultValues: {
      project_id: projectId,
    },
    resolver: yupResolver(createProjectImageScheme)
  })

  const onSubmit: SubmitHandler<ProjectImageFormData> = async (data) => {
    if (images.length === 0) {
      setError('image', {
        message: 'Пожалуйста выберите изображение'
      })
    }

    try {
      const response = await trigger({...data, project_id: projectId, image: images[0]})
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

export { CreateProjectImage }
