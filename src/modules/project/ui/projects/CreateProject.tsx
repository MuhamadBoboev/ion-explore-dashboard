import { useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { postFetcher } from '@shared/api/fetcher/postFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
import { useProjectStore } from '@modules/project/model/projects/store'
import { createProjectScheme, ProjectFormData } from '@modules/project/model/projects/ProjectFormData'
import { ProjectForm } from '@modules/project/ui/projects/ProjectForm'
import { KeyedMutator } from 'swr'

interface Props {
  mutate: KeyedMutator<any>
}

function CreateProject({mutate}: Props) {
  const [images, setImages] = useState<File[]>([])
  const {trigger, isMutating} = useSWRMutation('/projects', postFetcher)
  const [handleCreateClose] = useProjectStore(({handleCreateClose}) => [handleCreateClose])
  const {
    control,
    formState: {errors},
    handleSubmit,
    setValue,
  } = useForm<ProjectFormData>({
    mode: 'onBlur',
    resolver: yupResolver(createProjectScheme)
  })

  const onSubmit: SubmitHandler<ProjectFormData> = async (data) => {
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

export { CreateProject }
