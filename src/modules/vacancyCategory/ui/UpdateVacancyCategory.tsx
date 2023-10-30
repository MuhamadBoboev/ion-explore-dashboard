import { KeyedMutator } from 'swr'
import useSWRMutation from 'swr/mutation'
import { updateFetcher } from '@shared/api/fetcher/updateFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
import { useVacancyCategoryStore } from '@modules/vacancyCategory/model/store'
import {
  updateVacancyCategoryScheme,
  VacancyCategoryFormData
} from '@modules/vacancyCategory/model/VacancyCategoryFormData'
import { VacancyCategoryForm } from '@modules/vacancyCategory/ui/VacancyCategoryForm'

interface Props {
  mutate: KeyedMutator<any>
}

function UpdateVacancyCategory({mutate}: Props) {
  const [vacancyCategory, handleUpdateClose] = useVacancyCategoryStore(
    ({handleUpdateClose, update}) => [update, handleUpdateClose]
  )
  const {trigger, isMutating} = useSWRMutation(['/vacancy-categories', vacancyCategory?.id], updateFetcher)
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<VacancyCategoryFormData>({
    defaultValues: {
      name: vacancyCategory?.name,
    },
    mode: 'onBlur',
    resolver: yupResolver(updateVacancyCategoryScheme)
  })

  const onSubmit: SubmitHandler<VacancyCategoryFormData> = async (data) => {
    try {
      const response = await trigger(data)
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

export { UpdateVacancyCategory }
