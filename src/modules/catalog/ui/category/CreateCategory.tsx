import useSWRMutation from 'swr/mutation'
import { postFetcher } from '@shared/api/fetcher/postFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
import { useCategoryStore } from '@modules/catalog/model/category/store'
import { CategoryFormData, createCategoryScheme } from '@modules/catalog/model/category/CategoryFormData'
import { CategoryForm } from '@modules/catalog/ui/category/CategoryForm'
// import { IService } from '@modules/service'
import { KeyedMutator } from 'swr'
import { postFetcherJson } from '@shared/api/fetcher/postFetcherJson'
import { useLanguageStore } from '@shared/model/store'

interface Props {
  services: any
  mutate: KeyedMutator<any>
}

function CreateCategory({ services, mutate }: Props) {
  // const [images, setImages] = useState<File[]>([])
  const { trigger, isMutating } = useSWRMutation('/category/', postFetcherJson)
  const [handleCreateClose] = useCategoryStore(({ handleCreateClose }) => [handleCreateClose])
  const lang = useLanguageStore(({ langList, lang }) => (langList.find((el) => el.code === lang)))

  const {
    control,
    formState: { errors },
    handleSubmit,
    // setError,
    // setValue,
  } = useForm<CategoryFormData>({
    mode: 'onBlur',
    defaultValues: {
      lang_id: lang?.id,
    },
    resolver: yupResolver(createCategoryScheme)
  })

  const onSubmit: SubmitHandler<CategoryFormData> = async (data) => {
    // if (images.length === 0) {
    //   setError('icon', {
    //     message: 'Пожалуйста выберите иконку'
    //   })
    // }
    try {
      const response = await trigger(data)
      await mutate()
      handleCreateClose()
      toast.success(response.message)
    } catch (e) {
      const error = e as AxiosError<{ message: string }>
      toast.error(error.response?.data.message || 'Произошла ошибка')
    }
    console.log(data)


  }

  // debugger
  return (
    <CustomDialog
      title="Создать"
      handleClose={handleCreateClose}
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
          sx={{ mt: 5 }}
        >
          Отправить
        </LoadingButton>
      </form>
    </CustomDialog>
  )
}

export { CreateCategory }
