import { KeyedMutator } from 'swr'
import useSWRMutation from 'swr/mutation'
import { updateFetcher } from '@shared/api/fetcher/updateFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
import { useAttributeStore } from '@modules/attribute/model/store'
import { AttributeFormData, updateAttributeScheme } from '@modules/attribute/model/AttributeFormData'
import { AttributeForm } from '@modules/attribute/ui/AttributeForm'

interface Props {
  mutate: KeyedMutator<any>
}

function UpdateAttribute({mutate}: Props) {
  const [attribute, handleUpdateClose] = useAttributeStore(
    ({handleUpdateClose, update}) => [update, handleUpdateClose]
  )
  const {trigger, isMutating} = useSWRMutation(['/attributes', attribute?.id], updateFetcher)
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<AttributeFormData>({
    defaultValues: {
      name: attribute?.name,
      unit: attribute?.unit,
    },
    mode: 'onBlur',
    resolver: yupResolver(updateAttributeScheme)
  })

  const onSubmit: SubmitHandler<AttributeFormData> = async (data) => {
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

export { UpdateAttribute }
