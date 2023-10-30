import useSWRMutation from 'swr/mutation'
import { postFetcher } from '@shared/api/fetcher/postFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
import { useCollectionStore } from '@modules/collection/model/store'
import { CollectionFormData, createCollectionScheme } from '@modules/collection/model/CollectionFormData'
import { CollectionForm } from '@modules/collection/ui/CollectionForm'
import { IProvider } from '@modules/provider'
import { KeyedMutator } from 'swr'

interface Props {
  providers: IProvider[]
  mutate: KeyedMutator<any>
}

function CreateCollection({providers, mutate}: Props) {
  const {trigger, isMutating} = useSWRMutation('/collections', postFetcher)
  const [handleCreateClose] = useCollectionStore(({handleCreateClose}) => [handleCreateClose])
  const {
    control,
    formState: {errors},
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
  } = useForm<CollectionFormData>({
    mode: 'onBlur',
    defaultValues: {
      category_id: [],
      subcategory_id: []
    },
    resolver: yupResolver(createCollectionScheme)
  })

  const onSubmit: SubmitHandler<CollectionFormData> = async (data) => {
    try {
      const formData: any = {
        ...data,
        category_id: data.category_id[0],
      }
      if (data.subcategory_id && data.subcategory_id[0]) {
        formData.subcategory_id = formData.subcategory_id[0]
      }
      const response = await trigger(formData)
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
      title="Создать"
      handleClose={handleCreateClose}
    >
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <CollectionForm
          errors={errors}
          control={control}
          watch={watch}
          providers={providers}
          getValues={getValues}
          setValue={setValue}
          reset={reset}
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

export { CreateCollection }
