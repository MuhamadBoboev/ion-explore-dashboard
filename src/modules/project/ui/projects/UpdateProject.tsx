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
import { useProjectStore } from '@modules/project/model/projects/store'
import { ProjectFormData, updateProjectScheme } from '@modules/project/model/projects/ProjectFormData'
import { ProjectForm } from '@modules/project/ui/projects/ProjectForm'

interface Props {
  mutate: KeyedMutator<any>
}

function UpdateProject({mutate}: Props) {
  const [images, setImages] = useState<File[]>([])
  const [project, handleUpdateClose, handleUpdateOpen] = useProjectStore(
    ({handleUpdateClose, update, handleUpdateOpen}) => [update, handleUpdateClose, handleUpdateOpen]
  )
  const {trigger, isMutating} = useSWRMutation(['/projects', project?.id], updateFetcher)
  const {
    control,
    formState: {errors},
    handleSubmit,
    setValue,
  } = useForm<ProjectFormData>({
    defaultValues: {
      title: project?.title,
      short_description: project?.short_description,
      description: project?.description,
    },
    mode: 'onBlur',
    resolver: yupResolver(updateProjectScheme)
  })

  const onSubmit: SubmitHandler<ProjectFormData> = async (data) => {
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
        <ProjectForm
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

export { UpdateProject }
