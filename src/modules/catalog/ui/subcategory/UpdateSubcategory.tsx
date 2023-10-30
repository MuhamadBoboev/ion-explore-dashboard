import { KeyedMutator } from 'swr'
import useSWRMutation from 'swr/mutation'
import { updateFetcher } from '@shared/api/fetcher/updateFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
import { useSubcategoryStore } from '@modules/catalog/model/subcategory/store'
import { SubcategoryFormData, updateSubcategoryScheme } from '@modules/catalog/model/subcategory/SubcategoryFormData'
import { SubcategoryForm } from '@modules/catalog/ui/subcategory/SubcategoryForm'
import { IService } from '@modules/service'

interface Props {
  categoryId: number
  mutate: KeyedMutator<any>
  services: IService[]
}

function UpdateSubcategory({categoryId, mutate, services}: Props) {
  // const [images, setImages] = useState<File[]>([])
  const [subcategory, handleUpdateClose] = useSubcategoryStore(
    ({handleUpdateClose, update}) => [update, handleUpdateClose]
  )
  const {trigger, isMutating} = useSWRMutation(['/subcategories', subcategory?.id], updateFetcher)
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<SubcategoryFormData>({
    defaultValues: {
      name: subcategory?.name,
      description: subcategory?.description,
      order: subcategory?.order,
      category_id: categoryId,
      service_ids: subcategory?.services?.map(({id}) => id),
    },
    mode: 'onBlur',
    resolver: yupResolver(updateSubcategoryScheme)
  })

  const onSubmit: SubmitHandler<SubcategoryFormData> = async (data) => {
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
        <SubcategoryForm
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

export { UpdateSubcategory }
