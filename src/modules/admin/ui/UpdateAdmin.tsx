import { KeyedMutator } from 'swr'
import useSWRMutation from 'swr/mutation'
import { updateFetcher } from '@shared/api/fetcher/updateFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { LoadingButton } from '@mui/lab'
import { IRole } from '@shared/model/IRole'
import { useAdminStore } from '@modules/admin/model/store'
import { AdminFormData, updateAdminScheme } from '@modules/admin/model/AdminFormData'
import { AdminForm } from '@modules/admin/ui/AdminForm'

interface Props {
  mutate: KeyedMutator<any>
  roles: IRole[]
}

function UpdateAdmin({mutate, roles}: Props) {
  const [admin, handleUpdateClose] = useAdminStore(
    ({handleUpdateClose, update}) => [update, handleUpdateClose]
  )
  const {trigger, isMutating} = useSWRMutation(['/users', admin?.id], updateFetcher)
  const {
    control,
    formState: {errors},
    handleSubmit,
    setError,
  } = useForm<AdminFormData>({
    defaultValues: {
      name: admin?.name,
      email: admin?.email,
      role_ids: admin?.roles.map(({id}) => id) || []
    },
    mode: 'onBlur',
    resolver: yupResolver(updateAdminScheme)
  })

  const onSubmit: SubmitHandler<AdminFormData> = async (data) => {
    const adminId = roles.find(({key}) => key === 'admin')?.id!
    const managerId = roles.find(({key}) => key === 'manager')?.id!
    if (!data.role_ids.includes(adminId) && !data.role_ids.includes(managerId)) {
      setError('role_ids', {
        message: 'Выберите роль'
      })
      return
    }
    const userRole = roles.find(({key}) => key === 'user')!
    const formData = {
      ...data,
      email: data.email ? data.email : null,
      role_ids: [...data.role_ids, userRole.id]
    }
    try {
      const response = await trigger(formData)
      handleUpdateClose()
      await mutate()
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
        <AdminForm
          errors={errors}
          control={control}
          roles={roles}
          type="update"
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

export { UpdateAdmin }
