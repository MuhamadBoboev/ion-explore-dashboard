import useSWRMutation from 'swr/mutation'
import { postFetcher } from '@shared/api/fetcher/postFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
import { useVacancyCategoryStore } from '@modules/vacancyCategory/model/store'
import {
  createVacancyCategoryScheme,
  VacancyCategoryFormData
} from '@modules/vacancyCategory/model/VacancyCategoryFormData'
import { VacancyCategoryForm } from '@modules/vacancyCategory/ui/VacancyCategoryForm'

function CreateVacancyCategory() {
  const {trigger, isMutating} = useSWRMutation('/vacancy-categories', postFetcher)
  const [handleCreateClose] = useVacancyCategoryStore(({handleCreateClose}) => [handleCreateClose])
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<VacancyCategoryFormData>({
    mode: 'onBlur',
    resolver: yupResolver(createVacancyCategoryScheme)
  })

  const onSubmit: SubmitHandler<VacancyCategoryFormData> = async (data) => {
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
        <VacancyCategoryForm
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

export { CreateVacancyCategory }
