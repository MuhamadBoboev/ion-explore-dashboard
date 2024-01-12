import useSWRMutation from 'swr/mutation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
import { KeyedMutator } from 'swr'
import { postFetcherJson } from '@shared/api/fetcher/postFetcherJson'
import { useLanguageStore } from '@shared/model/store'
import { EnterContactFormData, createEnterContactScheme } from '@modules/enterContact/model/enterContacts/enterContactFormData'
import { useEnterContactStore } from '@modules/enterContact/model/enterContacts/store'
import { EnterContactForm } from './EnterContactForm'
import { useRouter } from 'next/router'

interface Props {
  // services: any
  mutate: KeyedMutator<any>
}

function CreateEnterContact({ mutate }: Props) {
  // const [images, setImages] = useState<File[]>([])
  const { trigger, isMutating } = useSWRMutation('/entertainment/contacts/', postFetcherJson)
  const [handleCreateClose] = useEnterContactStore(({ handleCreateClose }) => [handleCreateClose])
  const router = useRouter()
  const {
    control,
    formState: { errors },
    handleSubmit,
    // setError,
    // setValue,
  } = useForm<EnterContactFormData>({
    mode: 'onBlur',
    defaultValues: {
      // lang_id: lang?.id,
      entertainment_id: Number(router.query.id)
    },
    resolver: yupResolver(createEnterContactScheme)
  })

  const onSubmit: SubmitHandler<EnterContactFormData> = async (data) => {
    try {
      const response = await trigger(data)
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

export { CreateEnterContact }
