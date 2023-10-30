import { KeyedMutator } from 'swr'
import useSWRMutation from 'swr/mutation'
import { updateFetcher } from '@shared/api/fetcher/updateFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
import { useCategoryStore } from '@modules/catalog/model/category/store'
import { CategoryFormData, updateCategoryScheme } from '@modules/catalog/model/category/CategoryFormData'
import { CategoryForm } from '@modules/catalog/ui/category/CategoryForm'
import { IService } from '@modules/service'

interface Props {
  mutate: KeyedMutator<any>
  services: IService[]
}

function UpdateCategory({mutate, services}: Props) {
  // const [images, setImages] = useState<File[]>([])
  const [category, handleUpdateClose] = useCategoryStore(
    ({handleUpdateClose, update}) => [update, handleUpdateClose]
  )
  const {trigger, isMutating} = useSWRMutation(['/categories', category?.id], updateFetcher)
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<CategoryFormData>({
    defaultValues: {
      name: category?.name,
      description: category?.description,
      order: category?.order,
      service_ids: category?.services?.map(({id}) => id)
    },
    mode: 'onBlur',
    resolver: yupResolver(updateCategoryScheme)
  })

  const onSubmit: SubmitHandler<CategoryFormData> = async (data) => {
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
        <CategoryForm
          errors={errors}
          control={control}
          services={services}
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

export { UpdateCategory }
