import useSWRMutation from 'swr/mutation'
import { postFetcher } from '@shared/api/fetcher/postFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
import { useAttributeStore } from '@modules/attribute/model/store'
import { AttributeFormData, createAttributeTypeScheme } from '@modules/attribute/model/AttributeFormData'
import { AttributeForm } from '@modules/attribute/ui/AttributeForm'
import { KeyedMutator } from 'swr'

interface Props {
  mutate: KeyedMutator<any>
}

function CreateAttribute({mutate}: Props) {
  const {trigger, isMutating} = useSWRMutation('/attributes', postFetcher)
  const [handleCreateClose] = useAttributeStore(({handleCreateClose}) => [handleCreateClose])
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<AttributeFormData>({
    mode: 'onBlur',
    resolver: yupResolver(createAttributeTypeScheme)
  })

  const onSubmit: SubmitHandler<AttributeFormData> = async (data) => {
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
        <AttributeForm
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

export { CreateAttribute }
