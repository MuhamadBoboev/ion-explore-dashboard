import { KeyedMutator } from 'swr'
import useSWRMutation from 'swr/mutation'
import { updateFetcher } from '@shared/api/fetcher/updateFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
import { useSpecialistCategoryStore } from '@modules/specialistCategory/model/store'
import {
  SpecialistCategoryFormData,
  updateSpecialistCategoryScheme
} from '@modules/specialistCategory/model/SpecialistCategoryFormData'
import { SpecialistCategoryForm } from '@modules/specialistCategory/ui/SpecialistCategoryForm'

interface Props {
  mutate: KeyedMutator<any>
}

function UpdateSpecialistCategory({mutate}: Props) {
  const [specialistCategory, handleUpdateClose] = useSpecialistCategoryStore(
    ({handleUpdateClose, update}) => [update, handleUpdateClose]
  )
  const {trigger, isMutating} = useSWRMutation(['/specialist-categories', specialistCategory?.id], updateFetcher)
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<SpecialistCategoryFormData>({
    defaultValues: {
      name: specialistCategory?.name,
    },
    mode: 'onBlur',
    resolver: yupResolver(updateSpecialistCategoryScheme)
  })

  const onSubmit: SubmitHandler<SpecialistCategoryFormData> = async (data) => {
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

export { UpdateSpecialistCategory }
