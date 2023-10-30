import useSWRMutation from 'swr/mutation'
import { postFetcher } from '@shared/api/fetcher/postFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
import { useSpecialistCategoryStore } from '@modules/specialistCategory/model/store'
import {
  createSpecialistCategoryScheme,
  SpecialistCategoryFormData
} from '@modules/specialistCategory/model/SpecialistCategoryFormData'
import { SpecialistCategoryForm } from '@modules/specialistCategory/ui/SpecialistCategoryForm'

function CreateSpecialistCategory() {
  const {trigger, isMutating} = useSWRMutation('/specialist-categories', postFetcher)
  const [handleCreateClose] = useSpecialistCategoryStore(({handleCreateClose}) => [handleCreateClose])
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<SpecialistCategoryFormData>({
    mode: 'onBlur',
    resolver: yupResolver(createSpecialistCategoryScheme)
  })

  const onSubmit: SubmitHandler<SpecialistCategoryFormData> = async (data) => {
    try {
      const response = await trigger(data)
      handleCreateClose()
      toast.success(response.message)
    } catch (e) {
      const error = e as AxiosError<{ message: string }>
      toast.error(error.response?.data.message || 'Произошла ошибка')
    }
  }

  return (
    <CustomDialog
      title="Создать"
      handleClose={handleCreateClose}
    >
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <SpecialistCategoryForm
          errors={errors}
          control={control}
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

export { CreateSpecialistCategory }
