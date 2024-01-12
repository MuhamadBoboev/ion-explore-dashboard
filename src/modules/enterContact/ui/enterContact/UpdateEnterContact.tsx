import { KeyedMutator } from 'swr'
import useSWRMutation from 'swr/mutation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
import { updateFetcherJson } from '@shared/api/fetcher/updateFetcherJson'
import { useEnterContactStore } from '@modules/enterContact/model/enterContacts/store'
import { EnterContactForm } from './EnterContactForm'
import { EnterContactFormData, updateEnterContactScheme } from '@modules/enterContact/model/enterContacts/enterContactFormData'
import { useRouter } from 'next/router'

interface Props {
  mutate: KeyedMutator<any>
  // services: any
}

function UpdateEnterContact({ mutate }: Props) {
  // const [images, setImages] = useState<File[]>([])
  const [category, handleUpdateClose] = useEnterContactStore(
    ({ handleUpdateClose, update }) => [update, handleUpdateClose]
  )
  const router = useRouter()
  const { trigger, isMutating } = useSWRMutation(['/entertainment/contacts', category?.id], updateFetcherJson)
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<EnterContactFormData>({
    defaultValues: {
      // id: category?.id,
      address: category?.address,
      phone: category?.phone,
      whatsapp: category?.whatsapp,
      latitude: category?.latitude,
      longitude: category?.longitude,
      entertainment_id: Number(router.query.id)
    },
    mode: 'onBlur',
    resolver: yupResolver(updateEnterContactScheme)
  })

  const onSubmit: SubmitHandler<EnterContactFormData> = async (data) => {
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
        <EnterContactForm
          errors={errors}
          control={control}
        // services={services}
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

export { UpdateEnterContact }
