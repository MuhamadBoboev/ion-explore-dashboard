import { KeyedMutator } from 'swr'
import useSWRMutation from 'swr/mutation'
import { updateFetcher } from '@shared/api/fetcher/updateFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
import { IProvider } from '@modules/provider'
import { useCollectionStore } from '@modules/collection/model/store'
import { CollectionFormData, updateCollectionScheme } from '@modules/collection/model/CollectionFormData'
import { CollectionForm } from '@modules/collection/ui/CollectionForm'

interface Props {
  providers: IProvider[]
  mutate: KeyedMutator<any>
}

function UpdateCollection({providers, mutate}: Props) {
  const [collection, handleUpdateClose] = useCollectionStore(
    ({handleUpdateClose, update}) => [update, handleUpdateClose]
  )
  const {trigger, isMutating} = useSWRMutation(['/collections', collection?.id], updateFetcher)
  const {
    control,
    formState: {errors},
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
  } = useForm<CollectionFormData>({
    defaultValues: {
      name: collection?.name,
      provider_id: collection?.provider.id,
      category_id: [collection?.category.id],
      subcategory_id: collection?.subcategory?.id ? [collection?.subcategory?.id] : [],
    },
    mode: 'onBlur',
    resolver: yupResolver(updateCollectionScheme)
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

export { UpdateCollection }
